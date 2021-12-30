import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../../services/db/films.service';
import { CFilmService } from '../../../../services/components/c-film.service';
import { Films } from '../../../../models/films.interface';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  films: Films[];
  api_domain: string;
  film: Films;
  constructor(
    private cFilmService: CFilmService,
    private filmsService: FilmsService
  ) {
    this.films = [];
    this.film = {};
    this.api_domain = environment.api_domain;
  }
  main() {
    this.cFilmService.loadMain();
  }
  delete(id: any) {
    this.films.forEach((film: Films) => {
      if (id === film.id) {
        this.cFilmService.loadDelete(id, film);
      }
    });
  }
  edite(id: any) {
    this.cFilmService.loadEdite(id);
  }

  ngOnInit(): void {
    this.filmsService.getAllFilms().subscribe((data: any) => {
      this.films = data;
      this.films.forEach((film: Films) => {
        film.cover_page_url = this.api_domain + film.cover_page_url;
        film.video_url = this.api_domain + film.video_url;
      });
    });
    const tbody: any = document.getElementById('tbody');
    tbody.onkeyup = (e: any) => {
      var tr: any = e.target.parentElement;
      var thsArray: any = tr.querySelectorAll('th');
      thsArray.forEach((th: any) => {
        var buttonSave: any = th.querySelector('div #options #opc_save');
        if (buttonSave) {
          buttonSave.classList.add('block', 'visible');
          buttonSave.classList.remove('hidden', 'invisible');
        }
      });
      tr.className =
        'bg-green-400 dark:bg-green-500 ' +
        'border dark:border-green-500 ' +
        'hover:bg-blue-600 dark:hover:bg-gray-400 text-gray-800 ' +
        'hover:text-gray-50 dark:text-gray-200 dark:hover:text-gray-900 ' +
        'transition duration-300 ease-in-out';
    };
  }
}
