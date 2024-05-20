import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  emailValidator,
  numberValidator,
  stringValidator,
} from '../../validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientDialogComponent } from '../update-client-dialog/update-client-dialog.component';

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrl: './my-clients.component.css',
})
export class MyClientsComponent implements OnInit {
  clientForm!: FormGroup;
  clients: Client[] | undefined;
  client: Client | undefined;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data;
    });
  }

  createForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, stringValidator])],
      surname: ['', Validators.compose([Validators.required, stringValidator])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.compose([Validators.required, numberValidator])],
    });
  }

  addClient() {
    if (this.clientForm?.valid) {
      this.clientService
        .addClient(
          new Client(
            this.clientForm.controls['name'].value,
            this.clientForm.controls['surname'].value,
            this.clientForm.controls['email'].value,
            this.clientForm.controls['phone'].value
          )
        )
        .subscribe((data) => {
          alert('Klijent dodat');
          this.clients?.push(data);
          // console.log(this.clients);
          this.clientForm.reset();
        });
    }
    return false;
  }

  deleteClient(id: any) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clientService.getAllClients().subscribe((data) => {
        this.clients = data;
      });
    });
  }

  editClient(client: Client) {
    const dialogRef = this.dialog.open(UpdateClientDialogComponent, {
      data: client,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.clientService.getAllClients().subscribe((data) => {
        this.clients = data;
      });
    });
  }
}
