import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ViewFilmDirective } from '../../../directives/view-film.directive';
import { CFilmService } from '../../../services/components/c-film.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-film',
  template: ` <ng-template appViewFilm></ng-template> `,
})
export class FilmComponent implements OnInit, OnDestroy {
  @ViewChild(ViewFilmDirective, { static: true })
  profileHost: ViewFilmDirective;
  private destroySubject = new Subject();

  constructor(
    private cFilmService: CFilmService,
    private vcr: ViewContainerRef
  ) {
    this.profileHost = { viewContainerRef: this.vcr };
  }

  ngOnInit(): void {
    const viewContainerRef: any = this.profileHost.viewContainerRef;

    this.cFilmService.stateComponent$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap((state: any) =>
          this.cFilmService.loadComponent(viewContainerRef, state)
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
