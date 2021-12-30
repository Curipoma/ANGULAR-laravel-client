import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Films } from 'src/app/models/films.interface';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class CFilmService {
  private stateComponent = new BehaviorSubject('index');
  stateComponent$ = this.stateComponent.asObservable();
  id?: number;
  film: Films;
  constructor(public appService: AppService) {
    this.id;
    this.film = {};
  }
  loadIndex(): void {
    this.stateComponent.next('index');
  }
  loadMain(): void {
    this.stateComponent.next('main');
  }
  loadCreate(): void {
    this.stateComponent.next('create');
  }
  loadEdite(id: number): void {
    this.id = id;
    this.stateComponent.next('edite');
  }
  
  loadDelete(id: number, film: Films): void {
    this.id = id;
    this.film = film;
    this.stateComponent.next('delete');
  }

  loadComponent(vcr: ViewContainerRef, stateComp: string): any {
    vcr.clear();
    if (stateComp == 'index') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/film-container/film/index/index.component'
          ).then((m) => m.IndexComponent),
      });
    } else if (stateComp == 'create') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/film-container/film/create/create.component'
          ).then((m) => m.CreateComponent),
      });
    } else if (stateComp == 'edite') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/film-container/film/edit/edit.component'
          ).then((m) => m.EditComponent),
      });
    } else if (stateComp == 'delete') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/film-container/film/delete/delete.component'
          ).then((m) => m.DeleteComponent),
      });
    }
    return this.appService.forChild(vcr, {
      loadChildren: () =>
        import('../../components/film-container/film/main/main.component').then(
          (m) => m.MainComponent
        ),
    });
  }
}
