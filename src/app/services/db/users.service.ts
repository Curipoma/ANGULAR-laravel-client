import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';

import { User } from '../../models/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private base: string = environment.base;
  private user: User;

  constructor(private httpClient: HttpClient) {
    this.user = {};
  }
  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.base}/users/store`, user);
  }
  loginUser(user: User): Observable<User> {
    return this.httpClient.post(`${this.base}/login`, user);
  }
}
