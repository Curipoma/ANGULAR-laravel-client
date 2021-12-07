import { Component, OnInit } from '@angular/core';
import { NavFilmService } from '../../../../services/components/nav-film.service';

@Component({
  selector: 'app-film-nav',
  templateUrl: './film-nav.component.html',
  styleUrls: ['./film-nav.component.scss'],
})
export class FilmNavComponent implements OnInit {
  constructor(private navFilmService: NavFilmService) {}

  ngOnInit(): void {}
  loadIndex(): void {
    this.navFilmService.loadIndex();
  }
  loadMain(): void {
    this.navFilmService.loadMain();
  }
  loadCreate(): void {
    this.navFilmService.loadCreate();
  }
}
