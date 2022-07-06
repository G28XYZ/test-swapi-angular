import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPerson, IPlanet } from 'src/utils/types';
import { AppService } from '../app.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
})
export class PlanetComponent {
  planet_id: string;
  planets: IPlanet[];
  planet: IPlanet | undefined;
  persons: IPerson[] | undefined;
  filteredPerson: IPerson[] | undefined;
  request: boolean = true;
  gender: string = 'all';

  constructor(
    private activateRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.planet_id = this.activateRoute.snapshot.params['id'];
    this.planets = this.appService.state.planets;
    this.planet = this.planets.find((planet) => planet.id === this.planet_id);
    console.log(this.planet);
  }

  ngOnInit(): void {
    if (this.planet === undefined) {
      console.log('Ошибка данных о планете');
      this.router.navigate(['/main']);
      return;
    }
    Promise.all(
      this.planet.residents.map((personAddress) =>
        this.appService.getPerson(personAddress)
      )
    )
      .then((data) => {
        this.persons = data.map(
          ({ name, mass, gender, height, hair_color, eye_color }) => ({
            name,
            mass,
            gender,
            height,
            hair_color,
            eye_color,
          })
        );
        this.filteredPerson = this.persons;
        console.log(this.persons);
      })
      .catch((err) => console.log(err))
      .finally(() => (this.request = false));
  }

  handleChangeGender(gender: string) {
    this.gender = gender;
    if (gender === 'all') {
      this.filteredPerson = this.persons;
      return;
    }
    this.filteredPerson = this.persons?.filter(
      (person) => person.gender === gender
    );
  }
}
