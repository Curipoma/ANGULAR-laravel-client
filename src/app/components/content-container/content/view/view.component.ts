import { Component, OnInit } from '@angular/core';
import { CContentService } from '../../../../services/components/c-content.service';
import { FilmsService } from '../../../../services/db/films.service';
import { Films } from '../../../../models/films.interface';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  film: Films;
  api_domain: string;
  constructor(
    private cContentService: CContentService,
    private filmsService: FilmsService
  ) {
    this.film = {};
    this.api_domain = environment.api_domain;
  }

  ngOnInit(): void {
    this.cContentService.id;
    this.film;

    this.filmsService
      .getFilm(this.cContentService.id)
      .subscribe((data: any) => {
        if (data) {
          this.film = data[0];
          this.film.video_url = this.api_domain + this.film.video_url;
          this.film.cover_page_url = this.api_domain + this.film.cover_page_url;
        }
      });
  }
}
