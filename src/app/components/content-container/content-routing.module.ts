import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentContainerComponent } from './content-container.component';

const routes: Routes = [
  {
    path: '',
    component: ContentContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
