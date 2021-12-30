import { Component, OnInit } from '@angular/core';
import { CarrucelService } from '../../../../services/animations/carrucel.service';
import { CFilmService } from '../../../../services/components/c-film.service';
import { FilmsService } from '../../../../services/db/films.service';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  base: string;
  constructor(
    private cFilmService: CFilmService,
    private filmsService: FilmsService,
    private carrucelService: CarrucelService
  ) {
    this.base = environment.api_domain;
  }

  index() {
    this.cFilmService.loadIndex();
  }
  ngOnInit(): void {
    this.carrucelService.carrucel();
  }
}
