import { Injectable } from '@angular/core';
import { CFilmService } from './c-film.service';

@Injectable({
  providedIn: 'root',
})
export class NavFilmService {
  constructor(private cFilmService: CFilmService) {}
  loadIndex(): void {
    this.cFilmService.loadIndex();
  }
  loadMain(): void {
    this.cFilmService.loadMain();
  }
  loadCreate(): void {
    this.cFilmService.loadCreate();
  }
}
