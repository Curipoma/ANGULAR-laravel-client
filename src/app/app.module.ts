import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { NavComponent } from './components/container-navigation/nav/nav.component';
import { ContainerNavigationComponent } from './components/container-navigation/container-navigation.component';

import { FooterComponent } from './components/footer/footer.component';

import { ContentModule } from './components/content-container/content.module';
import { FilmContainerModule } from './components/film-container/film.module';

import { ProfileHostDirective } from './directives/profile-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContainerNavigationComponent,
    FooterComponent,
    ProfileHostDirective,
  ],
  imports: [
    ContentModule,
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
