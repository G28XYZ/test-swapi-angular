import { Injectable } from '@angular/core';
import api from 'src/utils/api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {
    console.log('This is app Service Constructor!!!');
  }

  state = {
    request: true,
    planets: [],
  };

  getAllPlanets() {
    return api.getAllPlanets();
  }

  setPlanets(planets: []) {
    this.state.planets = planets;
  }

  testMethod(): string {
    return 'returning string';
  }
}
