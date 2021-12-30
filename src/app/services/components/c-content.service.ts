import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Films } from '../../models/films.interface';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class CContentService {
  private stateCompent = new BehaviorSubject('main');
  stateCompent$ = this.stateCompent.asObservable();

  id?: number;
  constructor(private appService: AppService) {}
  loadView(): void {
    this.stateCompent.next('view');
  }
  loadMain(): void {
    this.stateCompent.next('main');
  }
  loadList(): void {
    this.stateCompent.next('list');
  }
  loadComponent(vcr: ViewContainerRef, stateComp: string): any {
    vcr.clear();
    if (stateComp == 'view') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/content-container/content/view/view.component'
          ).then((m) => m.ViewComponent),
      });
    }
    if (stateComp == 'main') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/content-container/content/main/main.component'
          ).then((m) => m.MainComponent),
      });
    }
    if (stateComp == 'list') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/content-container/content/list/list.component'
          ).then((m) => m.ListComponent),
      });
    }
  }
}
