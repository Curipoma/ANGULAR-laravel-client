import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Films } from '../../models/films.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  api_domain: string;
  constructor(private httpClient: HttpClient) {
    this.api_domain = environment.api_domain;
  }
  getAllFilms(): Observable<Films> {
    return this.httpClient.get(`${this.api_domain}/api/films`);
  }
  addFilm(film: any): Observable<Films> {
    return this.httpClient.post(`${this.api_domain}/api/films/store`, film);
  }
  getFilm(id: any): Observable<Films> {
    return this.httpClient.get(`${this.api_domain}/api/films/show/${id}`);
  }
  updateFilm(id: any, film: any): Observable<Films> {
    return this.httpClient.post(
      `${this.api_domain}/api/films/update/${id}`,
      film
    );
  }
  deleteFilm(id: any): Observable<Films> {
    return this.httpClient.delete(`${this.api_domain}/api/films/destroy/${id}`);
  }
}
