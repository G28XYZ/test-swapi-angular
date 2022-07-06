import { Component, OnInit } from '@angular/core';
import { IPlanet } from 'src/utils/types';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  request: boolean = this.appServices.state.request;
  planets: IPlanet[] | [] = this.appServices.state.planets;

  constructor(private appServices: AppService) {}

  ngOnInit(): void {
    if (this.planets.length === 0) {
      this.appServices.setRequest(true);
      this.appServices
        .getAllPlanets()
        .then(({ results }) => {
          this.appServices.setPlanets(results);
          this._setRequest();
          this._setPlanets();
        })
        .catch((err) => console.log(err))
        .finally(() => this.appServices.setRequest(false));
    }
  }

  _setRequest() {
    this.request = this.appServices.state.request;
  }

  _setPlanets() {
    this.planets = this.appServices.state.planets;
  }
}
