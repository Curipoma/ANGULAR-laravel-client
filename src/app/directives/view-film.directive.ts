import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appViewFilm]' })
export class ViewFilmDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
