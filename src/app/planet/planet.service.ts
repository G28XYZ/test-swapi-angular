import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { IPerson, IPlanet, IStatePlanet } from 'src/utils/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  initialState: IStatePlanet = {
    planet: undefined,
    persons: [],
    filteredPersons: [],
    request: true,
    gender: 'all',
    countPerson: 4,
    showMorePersons: false,
  };

  state: BehaviorSubject<IStatePlanet> = new BehaviorSubject<IStatePlanet>(
    this.initialState
  );

  state$: Observable<IStatePlanet> = this.state.asObservable();

  constructor(private _http: HttpClient) {}

  setPlanet(planet: IPlanet | undefined) {
    this.state$.pipe(take(1)).subscribe((state) => {
      this.state.next({ ...state, planet });
    });
  }

  setGenderFilter(gender: string) {
    this.state$.pipe(take(1)).subscribe((state) => {
      if (gender === 'all') {
        return this.state.next({ ...state, filteredPersons: state.persons });
      }
      this.state.next({
        ...state,
        filteredPersons: state.persons.filter(
          (person) => person.gender === gender
        ),
      });
    });
    this._checkShowMorePersons();
  }

  setPerson(persons: IPerson[] | []) {
    this.state$.pipe(take(1)).subscribe((state) => {
      this.state.next({ ...state, persons, filteredPersons: persons });
    });
    this._checkShowMorePersons();
  }

  setRequest(request: boolean) {
    this.state$.pipe(take(1)).subscribe((state) => {
      this.state.next({ ...state, request });
    });
  }

  _checkShowMorePersons() {
    this.state$.pipe(take(1)).subscribe((state) => {
      if (state.countPerson > state.filteredPersons.length) {
        this.state.next({ ...state, showMorePersons: false });
      } else {
        this.state.next({ ...state, showMorePersons: true });
      }
    });
  }

  incCount() {
    this.state$.pipe(take(1)).subscribe((state) => {
      const countPerson = state.countPerson + 2;
      this.state.next({ ...state, countPerson });
    });
    this._checkShowMorePersons();
  }

  getPerson(url: string): Observable<IPerson> {
    return this._http.get<IPerson>(url);
  }
}
