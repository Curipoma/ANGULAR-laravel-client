import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Films } from '../../models/films.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  base: string;
  constructor(private httpClient: HttpClient) {
    this.base = environment.base;
  }
  getAllFilms(): Observable<Films> {
    return this.httpClient.get(`${this.base}/films`);
  }
  addFilm(film: any): Observable<Films> {
    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post(`${this.base}/films/store`, film, {
      headers: headers,
    });
  }
}
