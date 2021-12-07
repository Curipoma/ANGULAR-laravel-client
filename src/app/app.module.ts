import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { FilmContainerModule } from './components/film-container/film.module';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { ProfileHostDirective } from './directives/profile-host.directive';
import { ContainerNavigationComponent } from './components/container-navigation/container-navigation.component';

import { NavComponent } from './components/container-navigation/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    ProfileHostDirective,
    AppComponent,
    NavComponent,
    ContainerNavigationComponent,
    FooterComponent,
  ],
  imports: [
    FilmContainerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
