import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-swapi-angular';

  constructor(public appServices: AppService) {}

  ngOnInit() {
    this.appServices
      .getAllPlanets()
      .then(({ results }) => {
        this.appServices.state.request = false;
        this.appServices.setPlanets = results;
        console.log(results);
      })
      .catch((err) => console.log(err));
  }
}
