import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(
        map((data: any[]) => data.map((item: any) => this.convertToUser(item)))
      );
  }

  public addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.baseUrl, user)
      .pipe(map((data) => this.convertToUser(data)));
  }

  private convertToUser(item: any) {
    return new User(
      item.name,
      item.surname,
      item.email,
      item.phone,
      item.password,
      parseInt(item.id)
    );
  }
}
