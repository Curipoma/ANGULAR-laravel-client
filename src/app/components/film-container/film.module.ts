import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilmContainerRoutingModule } from './film-routing.module';

import { ViewFilmDirective } from '../../directives/view-film.directive';

import { FilmContainerComponent } from './film-container.component';
import { FilmComponent } from './film/film.component';
import { MainComponent } from './film/main/main.component';
import { IndexComponent } from './film/index/index.component';
import { CreateComponent } from './film/create/create.component';
import { FilmNavComponent } from './film/film-nav/film-nav.component';

@NgModule({
  declarations: [
    ViewFilmDirective,
    FilmContainerComponent,
    FilmComponent,
    MainComponent,
    IndexComponent,
    CreateComponent,
    FilmNavComponent,
  ],
  imports: [
    CommonModule,
    FilmContainerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FilmContainerModule {}
