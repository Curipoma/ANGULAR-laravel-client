import { Component, OnInit } from '@angular/core';
import { Films } from '../../../../models/films.interface';
import { FilmsService } from '../../../../services/db/films.service';
import { CFilmService } from '../../../../services/components/c-film.service';
import { environment } from '../../../../../environments/environment.prod';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  film: Films;
  baseApiImg: string;
  backgroundimage: any;

  constructor(
    private filmsService: FilmsService,
    private cFilmService: CFilmService
  ) {
    this.film = {};
    this.baseApiImg = environment.api_domain;
    this.backgroundimage = {};
  }

  delete(): void {
    this.filmsService
    .deleteFilm(this.cFilmService.id)
    .subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.cFilmService.loadIndex();
      }
    });
  }
  
  ngOnInit(): void {
    this.film = this.cFilmService.film;
    this.backgroundimage = this.baseApiImg + this.film.cover_page_url;
  }
}
