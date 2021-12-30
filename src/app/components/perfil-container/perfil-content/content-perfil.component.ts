import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ProfileViewDirective } from '../../../directives/profile-view.directive';
import { CPerfilService } from '../../../services/components/c-perfil.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'content-perfil',
  template: '<ng-template appProfileView></ng-template>',
})
export class ContentPerfilComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileViewDirective, { static: true })
  profiView: ProfileViewDirective;
  private destroySubject = new Subject();
  constructor(
    private cPerfilService: CPerfilService,
    private vcr: ViewContainerRef
  ) {
    this.profiView = { viewContainerRef: this.vcr };
  }

  ngOnInit(): void {
    const viewContainerRef: any = this.profiView.viewContainerRef;
    this.cPerfilService.stateComponent$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap((state: any) =>
          this.cPerfilService.loadComponent(viewContainerRef, state)
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
