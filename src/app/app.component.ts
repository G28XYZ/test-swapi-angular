import { Component } from '@angular/core';
import { AppService, IPlanets } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-swapi-angular';

  request: boolean = this.appServices.state.request;
  planets: IPlanets[] | [] = this.appServices.state.planets;

  constructor(private appServices: AppService) {}

  ngOnInit() {
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

  _setRequest() {
    this.request = this.appServices.state.request;
  }

  _setPlanets() {
    this.planets = this.appServices.state.planets;
  }
}
