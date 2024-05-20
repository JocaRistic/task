import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements DoCheck {
  loggedUser: any;

  constructor(private auth: AuthService) {}
  ngDoCheck(): void {
    if (this.auth.isLoggedIn()) {
      this.loggedUser = JSON.parse(this.auth.getLoggedUser());
    }
  }

  // ngOnInit(): void {
  //   if (this.auth.isLoggedIn()) {
  //     this.loggedUser = JSON.parse(this.auth.getLoggedUser());
  //   }
  // }
}
