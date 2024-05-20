import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../validators/validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  email: any | undefined;
  password: any | undefined;

  animal!: string;
  name!: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required])],
    });

    this.email = this.signinForm.controls['email'];
    this.password = this.signinForm.controls['password'];
  }

  signin() {
    if (!this.signinForm.valid) {
      return;
    }

    const email = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;

    this.auth.login(email, password);

    return false;

    // if (this.auth.login(email, password)) {
    //   alert('Uspesan login');
    //   this.router.navigate(['/pocetna']);
    // } else {
    //   alert('Uneti podaci nisu validni');
    // }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
