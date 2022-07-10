import { Component, OnInit } from '@angular/core';
import { interval, Observable, take } from 'rxjs';
import { IPlanet, IState } from 'src/utils/types';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  state$: Observable<IState>;
  nextPlanetPage: boolean = true;

  constructor(private appService: AppService) {
    this.state$ = this.appService.state;
  }

  ngOnInit(): void {
    this.state$.pipe(take(1)).subscribe((state) => {
      if (state.planets.length === 0) {
        this._renderPlanet();
      }
    });
  }

  _renderPlanet() {
    this.state$.pipe(take(1)).subscribe(() => {
      this.appService.setRequest(true);
      interval(500)
        .pipe(take(1))
        .subscribe(() => {
          this.appService.getPlanets().subscribe((swapiResponse) => {
            this.appService.setPlanets(swapiResponse.results);
            this.appService.setPlanetPage(0, {
              prevPage: !!swapiResponse.previous,
              nextPage: !!swapiResponse.next,
            });
          });
        });
    });
  }

  handleSetPage(number: number) {
    this.appService.setPlanetPage(number);
    this._renderPlanet();
  }
}
