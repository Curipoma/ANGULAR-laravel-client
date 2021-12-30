import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilContainerRoutingModule } from './perfil-container-routing.module';

import { PerfilComponent } from './perfil-content/perfil/perfil.component';
import { ContentPerfilComponent } from './perfil-content/content-perfil.component';
import { ProfileViewDirective } from '../../directives/profile-view.directive';
import { PerfilContainerComponent } from './perfil-container.component';

@NgModule({
  declarations: [
    PerfilComponent,
    ContentPerfilComponent,
    ProfileViewDirective,
    PerfilContainerComponent,
  ],
  imports: [CommonModule, PerfilContainerRoutingModule],
})
export class PerfilContainerModule {}
