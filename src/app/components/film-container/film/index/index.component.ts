import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../../services/db/films.service';
import { CFilmService } from '../../../../services/components/c-film.service';
import { Films } from '../../../../models/films.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  films: Films[];
  constructor(
    private cFilmService: CFilmService,
    private filmsService: FilmsService
  ) {
    this.films = [];
  }
  main() {
    this.cFilmService.loadMain();
  }

  ngOnInit(): void {
    this.filmsService.getAllFilms().subscribe((data: any) => {
      this.films = data;
    });
  }
}
