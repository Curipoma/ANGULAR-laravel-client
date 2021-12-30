import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  api_domain: string;
  constructor(private httpClient: HttpClient) {
    this.api_domain = environment.api_domain;
  }
  pagination(route: string, id: number): Observable<any> {
    return this.httpClient.get(`${this.api_domain}${route}${id}`);
  }
}
