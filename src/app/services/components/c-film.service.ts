import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class CFilmService {
  private stateComponent = new BehaviorSubject('create');
  stateComponent$ = this.stateComponent.asObservable();

  constructor(public appService: AppService) {}
  loadIndex(): void {
    this.stateComponent.next('index');
  }
  loadMain(): void {
    this.stateComponent.next('main');
  }
  loadCreate(): void {
    this.stateComponent.next('create');
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
    }
    return this.appService.forChild(vcr, {
      loadChildren: () =>
        import('../../components/film-container/film/main/main.component').then(
          (m) => m.MainComponent
        ),
    });
  }
}
