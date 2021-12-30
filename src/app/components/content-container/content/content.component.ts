import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ViewContentDirective } from '../../../directives/view-content.directive';
import { CContentService } from '../../../services/components/c-content.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-container',
  template: `<ng-template appViewContent></ng-template>`,
})
export class ContentComponent implements OnInit, OnDestroy {
  @ViewChild(ViewContentDirective, { static: true })
  viewContent: ViewContentDirective;
  private destroySubject = new Subject();

  constructor(
    private cContentService: CContentService,
    private vcr: ViewContainerRef
  ) {
    this.viewContent = { viewContainerRef: vcr };
  }

  ngOnInit(): void {
    const viewContainerRef: any = this.viewContent.viewContainerRef;

    this.cContentService.stateCompent$.pipe(
      takeUntil(this.destroySubject),
      mergeMap((state: any) =>
        this.cContentService.loadComponent(viewContainerRef, state)
      )
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
