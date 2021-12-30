import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../../../services/db/films.service';
import { Films } from '../../../../models/films.interface';
import { environment } from '../../../../../environments/environment.prod';
import { CContentService } from '../../../../services/components/c-content.service';
import { ResourcesService } from '../../../../services/db/resources/resources.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  allFilms: Films[];
  filmsRequest: any;
  title: string = 'Films';
  apiDomain: string;

  constructor(
    private filmsService: FilmsService,
    private cContentService: CContentService,
    private resourcesService: ResourcesService
  ) {
    this.allFilms = [];
    this.filmsRequest;
    this.apiDomain = environment.api_domain;
  }

  ngOnInit(): void {
    this.filmsService.getAllFilms().subscribe((data: any): any => {
      this.filmsRequest = data;
      this.allFilms = data['data'];
      this.allFilms.forEach((film: Films) => {
        film.cover_page_url = this.apiDomain + film.cover_page_url;
        film.video_url = this.apiDomain + film.video_url;
      });
      this.animationPagination();
    });
  }

  view(id: any): void {
    this.cContentService.id = id;
    this.cContentService.loadView();
  }

  animationPagination() {
    var pagSteps: any = document.getElementById('pag_steps');
    for (var i: number = 1; i <= this.filmsRequest.last_page; i++) {
      var button: any = document.createElement('button');
      button.className =
        'px-3 text-gray-900 dark:text-gray-300 dark:hover:text-gray-800 ' +
        'bg-purple-50 hover:bg-purple-300 dark:bg-gray-800 dark:hover:bg-gray-300 ' +
        'border border-indigo-500 dark:border-gray-600 rounded lowercase ';
      button.textContent = i;
      button.id = i;
      pagSteps.appendChild(button);
    }

    var contnBottonsPag: any = document.getElementById('contn_bottons_pag');
    contnBottonsPag.addEventListener('click', (e: any) => {
      if (
        e.target.parentElement.id == 'pag_steps' ||
        e.target.parentElement.id == 'pag_jumps'
      ) {
        this.animationButotns(e.target.id);
      }
    });
  }

  animationButotns(idChild: string) {
    var pagSteps: any = document.querySelectorAll('#pag_steps button');
    pagSteps.forEach((button: any) => {
      button.classList.remove('opacity-50');
    });
    var pagJumps: any = document.querySelectorAll('#pag_jumps button');
    pagJumps.forEach((botton: any) => {
      botton.classList.remove('opacity-50');
    });
    let currentPage: number = parseInt(this.filmsRequest['current_page']);
    let lastPage: number = parseInt(this.filmsRequest['last_page']);
    let firstPage = 1;

    if (parseInt(idChild)) {
      this.pagination(parseInt(idChild));
      this.printStepsButotnsOnly(parseInt(idChild));
      if (parseInt(idChild) == currentPage) {
        this.printJumpsButotnsOnly('current_page');
      } else if (parseInt(idChild) == lastPage) {
        this.printJumpsButotnsOnly('last_page');
      } else if (parseInt(idChild) == 1) {
        this.printJumpsButotnsOnly('first_page');
      }
    } else {
      switch (idChild) {
        case 'first_page':
          this.printJumpsButotnsOnly(idChild);
          this.pagination(firstPage);
          this.printStepsButotnsOnly(firstPage);
          break;

        case 'previous_page':
          this.printJumpsButotnsOnly(idChild);
          this.pagination(
            currentPage - 1 > firstPage ? currentPage - 1 : firstPage
          );
          this.printStepsButotnsOnly(
            currentPage - 1 > firstPage ? currentPage - 1 : firstPage
          );
          break;

        case 'next_page':
          this.printJumpsButotnsOnly(idChild);
          this.pagination(
            currentPage + 1 > lastPage ? lastPage : currentPage + 1
          );
          this.printStepsButotnsOnly(
            currentPage + 1 > lastPage ? lastPage : currentPage + 1
          );
          break;

        case 'last_page':
          this.printJumpsButotnsOnly(idChild);
          this.pagination(this.filmsRequest['last_page']);
          this.printStepsButotnsOnly(lastPage);
          break;

        default:
          break;
      }
    }
  }

  printStepsButotnsOnly(id: number) {
    document.getElementById(id.toString())?.classList.add('opacity-50');
  }

  printJumpsButotnsOnly(id: string) {
    if (id == 'first_page') {
      document.getElementById('last_page')?.classList.remove('opacity-50');
      document.getElementById('next_page')?.classList.remove('opacity-50');
      document.getElementById('previous_page')?.classList.add('opacity-50');
      document.getElementById(id)?.classList.add('opacity-50');
    } else if (id == 'previous_page') {
    } else if (id == 'next_page') {
    } else if (id == 'last_page') {
      document.getElementById('first_page')?.classList.remove('opacity-50');
      document.getElementById('previous_page')?.classList.remove('opacity-50');
      document.getElementById('next_page')?.classList.add('opacity-50');
      document.getElementById(id)?.classList.add('opacity-50');
    }
  }

  pagination(id: number) {
    this.resourcesService
      .pagination('/api/films?page=', id)
      .subscribe((data: any) => {
        this.filmsRequest = data;
        this.allFilms = data['data'];
        this.allFilms.forEach((film: Films) => {
          film.cover_page_url = this.apiDomain + film.cover_page_url;
          film.video_url = this.apiDomain + film.video_url;
        });
      });
  }
}
