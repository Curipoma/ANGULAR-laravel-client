import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class CPerfilService {
  private stateComponent = new BehaviorSubject('guest');
  stateComponent$ = this.stateComponent.asObservable();

  constructor(private appService: AppService) {}

  loadComponentAdmin() {
    this.stateComponent.next('admin');
  }
  loadComponentClient() {
    this.stateComponent.next('client');
  }
  loadComponentGuest() {
    this.stateComponent.next('guest');
  }

  loadComponent(vcr: ViewContainerRef, stateComponent: string): any {
    vcr.clear();
    if (stateComponent == 'admin') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/perfil-container/perfil-content/perfil/perfil.component'
          ).then((p) => p.PerfilComponent),
      });
    }
    if (stateComponent == 'client') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/perfil-container/perfil-content/perfil/perfil.component'
          ).then((p) => p.PerfilComponent),
      });
    }
    if (stateComponent == 'guest') {
      return this.appService.forChild(vcr, {
        loadChildren: () =>
          import(
            '../../components/perfil-container/perfil-content/perfil/perfil.component'
          ).then((p) => p.PerfilComponent),
      });
    }
  }
}
