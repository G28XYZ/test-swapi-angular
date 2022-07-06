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
}
