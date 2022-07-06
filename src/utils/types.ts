export interface IPlanet {
  id?: string;
  name: string;
  diameter: string;
  orbital_period: string;
  rotation_period: string;
  climate: string;
  population: string;
}

export interface IState {
  planets: [] | IPlanet[];
  request: boolean;
}
