import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class CNavService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(public appService: AppService) {}

  private guest() {
    return () =>
      import('../../components/container-navigation/nav/nav.component').then(
        (m) => m.NavComponent
      );
  }

  private auth() {
    return () =>
      import('../../components/container-navigation/nav/nav.component').then(
        (m) => m.NavComponent
      );
  }

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    vcr.clear();

    return this.appService.forChild(vcr, {
      loadChildren: isLoggedIn ? this.auth() : this.guest(),
    });
  }
}
