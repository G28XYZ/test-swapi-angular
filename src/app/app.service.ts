import { Injectable } from '@angular/core';
import api from 'src/utils/api';
import { IPlanet, IState } from 'src/utils/types';
import { generate } from 'shortid';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  state: IState = {
    request: true,
    planets: [],
  };

  getAllPlanets() {
    return api.getAllPlanets();
  }

  setPlanets(planets: IPlanet[]) {
    this.state.planets = planets.map((planet) => {
      planet.id = generate();
      return planet;
    });
    localStorage.setItem('planets', JSON.stringify(this.state.planets));
  }

  setRequest(bool: boolean) {
    this.state.request = bool;
  }

  getPerson(personAddress: string) {
    return api.getPerson(personAddress);
  }
}
