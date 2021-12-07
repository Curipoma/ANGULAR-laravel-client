import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ProfileHostDirective } from '../../directives/profile-host.directive';
import { CNavService } from '../../services/components/c-nav.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-container-navigation',
  template: ` <ng-template appProfileHost></ng-template> `,
})
export class ContainerNavigationComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileHostDirective, { static: true })
  profileHost: ProfileHostDirective;
  private destroySubject = new Subject();

  constructor(private cNavService: CNavService, private vcr: ViewContainerRef) {
    this.profileHost = { viewContainerRef: vcr };
  }

  ngOnInit() {
    const viewContainerRef: any = this.profileHost.viewContainerRef;

    this.cNavService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap((isLoggedIn) =>
          this.cNavService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
