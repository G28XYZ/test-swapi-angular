import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlanetComponent } from './planet/planet.component';
import { PlanetInfoComponent } from './planet/planet-info/planet-info.component';
import { InputRadioComponent } from './planet/input-radio/input-radio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PreloaderComponent,
    HeaderComponent,
    PlanetComponent,
    NotFoundComponent,
    PlanetInfoComponent,
    InputRadioComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
