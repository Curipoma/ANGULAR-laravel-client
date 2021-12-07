import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmContainerComponent } from './film-container.component';

const routes: Routes = [{ path: '', component: FilmContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmContainerRoutingModule {}
