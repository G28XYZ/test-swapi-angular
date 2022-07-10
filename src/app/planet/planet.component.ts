import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, tap, take } from 'rxjs';
import { IPerson, IPlanet, IState, IStatePlanet } from 'src/utils/types';
import { AppService } from '../app.service';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
})
export class PlanetComponent implements OnInit {
  globalState$: Observable<IState>;
  state$: Observable<IStatePlanet>;

  constructor(
    private activateRoute: ActivatedRoute,
    private planetService: PlanetService,
    private appService: AppService,
    private router: Router
  ) {
    this.globalState$ = this.appService.state;
    this.state$ = this.planetService.state;
  }

  ngOnInit(): void {
    const routePlanetId = this.activateRoute.snapshot.params['id'];
    this.globalState$.pipe(take(1)).subscribe((globalState) => {
      const planet = globalState.planets.find(
        (planet: IPlanet) => planet.id === routePlanetId
      );
      this.planetService.setPlanet(planet);

      if (planet === undefined) {
        console.log('Ошибка данных о планете');
        this.router.navigate(['/main']);
        return;
      }

      if (planet.residents.length > 0) {
        this.planetService.setRequest(true);
        forkJoin(
          planet.residents.map((personAddress) =>
            this.planetService.getPerson(personAddress)
          )
        ).subscribe((personsData) => {
          this.planetService.setRequest(false);
          this.planetService.setPerson(personsData);
        });
      } else {
        this.planetService.setRequest(false);
        this.planetService.setPerson([]);
      }
    });
  }

  ngOnDestroy() {
    this.planetService.setRequest(false);
    this.planetService.setPerson([]);
  }

  handleChangeGender(gender: string) {
    this.planetService.setGenderFilter(gender);
  }

  handleClickMoreCount() {
    this.planetService.incCount();
  }
}
