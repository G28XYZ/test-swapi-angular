import { Injectable } from '@angular/core';
import { IPlanet, IState, ISwapiResponse } from 'src/utils/types';
import { generate } from 'shortid';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, take, interval } from 'rxjs';
import { swapiAddress } from 'src/utils/constants';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient) {
    console.log('constructor app');
  }

  state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    request: true,
    planets: [],
    currentPage: 1,
    nextPage: false,
    prevPage: false,
  });

  state$: Observable<IState> = this.state.asObservable();

  getPlanets(): Observable<ISwapiResponse> {
    let url = '';
    this.state.subscribe(({ currentPage }) => {
      url = `${swapiAddress}/planets/?page=${currentPage}`;
    });
    return this._http.get<ISwapiResponse>(url);
  }

  setRequest(request: boolean) {
    this.state$.pipe(take(1)).subscribe((state) => {
      this.state.next({ ...state, request });
    });
    this._setLocalStorage();
  }

  setPlanets(planets: IPlanet[]) {
    this.state$.pipe(take(1)).subscribe((state) => {
      const newPlanets = planets.map((planet) => {
        if (!planet.id) {
          planet.id = generate();
        }
        return planet;
      });
      const newState = {
        ...state,
        planets: newPlanets,
        request: false,
      };
      this.state.next(newState);
    });
    this._setLocalStorage();
  }

  setPlanetPage(
    number: number = 0,
    option: { prevPage: boolean; nextPage: boolean } | null = null
  ) {
    if (option) {
      this.state$.pipe(take(1)).subscribe((state) => {
        this.state.next({ ...state, ...option });
      });
    }
    this.state$.pipe(take(1)).subscribe((state) => {
      this.state.next({ ...state, currentPage: state.currentPage + number });
    });
    this._setLocalStorage();
  }

  _setLocalStorage() {
    this.state$.pipe(take(1)).subscribe((state) => {
      localStorage.setItem('mainState', JSON.stringify(state));
    });
  }

  setStateFromStorage(state: IState) {
    this.state$.pipe(take(1)).subscribe(() => {
      this.state.next(state);
    });
  }
}
