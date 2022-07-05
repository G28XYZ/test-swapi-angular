import { Injectable } from '@angular/core';
import api from 'src/utils/api';

export interface IPlanets {
  name: string;
  diameter: string;
  orbital_period: string;
  rotation_period: string;
  climate: string;
  population: string;
}

export interface IState {
  planets: [] | IPlanets[];
  request: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {
    console.log('This is app Service Constructor!!!');
  }

  state: IState = {
    request: true,
    planets: [],
  };

  getAllPlanets() {
    return api.getAllPlanets();
  }

  setPlanets(planets: IPlanets[]) {
    this.state.planets = planets;
  }

  setRequest(bool: boolean) {
    this.state.request = bool;
  }

  testMethod(): string {
    return 'returning string';
  }
}
