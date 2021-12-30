import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';

import { ViewContentDirective } from '../../directives/view-content.directive';

import { ContentComponent } from './content/content.component';
import { ContentContainerComponent } from './content-container.component';
import { MainComponent } from './content/main/main.component';
import { ViewComponent } from './content/view/view.component';
import { ListComponent } from './content/list/list.component';

@NgModule({
  imports: [CommonModule, ContentRoutingModule],
  declarations: [
    ViewContentDirective,
    ContentContainerComponent,
    ContentComponent,
    ViewComponent,
    MainComponent,
    ListComponent,
  ],
})
export class ContentModule {}
