import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../models/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api_domain: string = environment.api_domain;

  constructor(private httpClient: HttpClient) {}
  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.api_domain}/api/users/store`,
      user
    );
  }
  loginUser(user: User): Observable<User> {
    return this.httpClient.post(`${this.api_domain}/api/login`, user);
  }
  logoutUser(id: number): Observable<Object> {
    return this.httpClient.get(`${this.api_domain}/api/logout/${id}`);
  }
}
