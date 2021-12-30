import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessClientGuardGuard } from './guards/access-client-guard.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'perfil',
    loadChildren: () =>
      import('./components/perfil-container/perfil-container.module').then(
        (p) => p.PerfilContainerModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((c) => c.ContentModule),
    canActivate: [GuestGuard],
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then(
        (c) => c.ContentModule
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./components/content-container/content.module').then(
        (m) => m.ContentModule
      ),
    canActivate: [AccessClientGuardGuard],
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./components/film-container/film.module').then(
        (m) => m.FilmContainerModule
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
