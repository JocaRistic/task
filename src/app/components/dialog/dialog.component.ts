import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  emailValidator,
  numberValidator,
  passwordValidator,
  stringValidator,
} from '../../validators/validators';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, stringValidator])],
      surname: ['', Validators.compose([Validators.required, stringValidator])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.compose([Validators.required, numberValidator])],
      password: [
        '',
        Validators.compose([Validators.required, passwordValidator]),
      ],
    });
  }

  signUp() {
    if (!this.signupForm.valid) {
      return;
    }

    const name = this.signupForm.controls['name'].value;
    const surname = this.signupForm.controls['surname'].value;
    const email = this.signupForm.controls['email'].value;
    const phone = this.signupForm.controls['email'].value;
    const password = this.signupForm.controls['password'].value;

    this.auth.register(name, surname, email, phone, password);
    this.dialogRef.close();
    return false;
  }
}
