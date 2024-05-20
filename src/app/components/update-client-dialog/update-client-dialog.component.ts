import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  emailValidator,
  numberValidator,
  stringValidator,
} from '../../validators/validators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-client-dialog',
  templateUrl: './update-client-dialog.component.html',
  styleUrl: './update-client-dialog.component.css',
})
export class UpdateClientDialogComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: [
        this.data.name,
        Validators.compose([Validators.required, stringValidator]),
      ],
      surname: [
        this.data.surname,
        Validators.compose([Validators.required, stringValidator]),
      ],
      email: [
        this.data.email,
        Validators.compose([Validators.required, emailValidator]),
      ],
      phone: [
        this.data.phone,
        Validators.compose([Validators.required, numberValidator]),
      ],
    });
  }

  updateClient() {
    let client = new Client(
      this.updateForm.controls['name'].value,
      this.updateForm.controls['surname'].value,
      this.updateForm.controls['email'].value,
      this.updateForm.controls['phone'].value,
      this.data.id
    );
    if (this.updateForm?.valid) {
      this.clientService.updateClient(client).subscribe((data) => {
        alert('Klijent updated');
        this.updateForm.reset();
        this.dialogRef.close();
        // this.router.navigate(['/clients']);
      });
    }
    return false;
  }
}
