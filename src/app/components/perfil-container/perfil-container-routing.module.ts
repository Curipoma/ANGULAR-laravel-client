import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilContainerComponent } from './perfil-container.component';

const routes: Routes = [{ path: '', component: PerfilContainerComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PerfilContainerRoutingModule {}
