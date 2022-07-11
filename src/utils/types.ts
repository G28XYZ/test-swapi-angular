export interface IPlanet {
  id?: string;
  name: string;
  diameter: string;
  orbital_period: string;
  rotation_period: string;
  climate: string;
  population: string;
  residents: string[] | [];
  terrain: string;
}

export interface IPerson {
  name: string;
  mass: string;
  gender: string;
  height: string;
  hair_color: string;
  eye_color: string;
}
export interface IState {
  planets: [] | IPlanet[];
  request: boolean;
  currentPage: number;
  nextPage: boolean;
  prevPage: boolean;
  totalCountPlanets: number;
}

export interface ISwapiResponse {
  count: number;
  next?: string | string;
  previous?: null | string;
  results: IPlanet[] | [];
}

export interface IStatePlanet {
  planet: IPlanet | undefined;
  persons: IPerson[] | [];
  filteredPersons: IPerson[] | [];
  request: boolean;
  gender: string;
  countPerson: number;
  showMorePersons: boolean;
}
