import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUser: User | undefined;

  constructor(private userService: UserService, private router: Router) {}

  login(email: string, password: string) {
    this.userService.getAllUsers().subscribe((data) => {
      this.loggedUser = data.find((user) => {
        return email === user.email && password === user.password;
      });

      if (this.loggedUser) {
        alert('Uspesan login');
        localStorage.setItem('user', JSON.stringify(this.loggedUser));

        this.router.navigate(['/pocetna']);
      } else {
        alert('Uneti podaci nisu validni');
      }
    });
  }

  logout() {
    this.loggedUser = undefined;
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  register(
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string
  ) {
    const user = new User(name, surname, email, phone, password);
    this.userService.addUser(user).subscribe((res) => {
      alert('Uspesno ste se registrovali');
      this.router.navigate(['/signin']);
    });
  }

  getLoggedUser(): any {
    return localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }
}
