import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appViewContent]' })
export class ViewContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
