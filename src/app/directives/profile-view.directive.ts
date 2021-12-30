import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appProfileView]' })
export class ProfileViewDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
