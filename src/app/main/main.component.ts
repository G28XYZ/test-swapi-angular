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
    this.appServices.setRequest(true);
    this.appServices
      .getAllPlanets()
      .then(({ results }) => {
        this.appServices.setPlanets(results);
        this.appServices.setRequest(false);
        this._setRequest();
        this._setPlanets();
        console.log(results);
      })
      .catch((err) => console.log(err));
  }

  getDetailsPlanet(planet: IPlanet) {}

  _setRequest() {
    this.request = this.appServices.state.request;
  }

  _setPlanets() {
    this.planets = this.appServices.state.planets;
  }

  formatMeasurementTime(time: string) {
    const lastNum = +time[time.length - 1];
    if (+time >= 10 && +time <= 20) return 'часов';
    if (lastNum === 1) {
      return 'час';
    } else if (lastNum > 1 && lastNum <= 4) {
      return 'часа';
    } else {
      return 'часов';
    }
  }
}
