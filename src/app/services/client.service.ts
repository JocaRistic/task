import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  public getAllClients(): Observable<Client[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((data) => data.map((item: any) => this.convertToClient(item))));
  }

  public getClientById(id: number): Observable<Client> {
    return this.http
      .get<any>(this.baseUrl + '/' + id)
      .pipe(map((item) => this.convertToClient(item)));
  }

  public addClient(client: Client): Observable<Client> {
    return this.http
      .post<any>(this.baseUrl, client)
      .pipe(map((item) => this.convertToClient(item)));
  }

  public deleteClient(id?: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  public updateClient(client: Client): Observable<Client> {
    console.log(client);
    return this.http
      .patch<Client>(this.baseUrl + '/' + client.id, client)
      .pipe(map((item) => this.convertToClient(item)));
  }

  private convertToClient(item: any) {
    return new Client(item.name, item.surname, item.email, item.phone, item.id);
  }
}
