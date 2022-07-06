import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlanetComponent } from './planet/planet.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PreloaderComponent,
    HeaderComponent,
    PlanetComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
