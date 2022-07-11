import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IState } from 'src/utils/types';
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
    this.state$.pipe(take(1)).subscribe((state) => {
      this.appService.setRequest(true);

      this.appService.getPlanets().subscribe(
        (swapiResponse) => {
          this.appService.setTotalCount(swapiResponse.count);
          this.appService.setPlanetPage(0, {
            prevPage: !!swapiResponse.previous,
            nextPage: !!swapiResponse.next,
          });
          this.appService.setPlanets(swapiResponse.results);
        },
        (error) => {
          // если страницы не существует вернуться к ближайшей корректной
          if (state.currentPage < 1) {
            this.appService.setPlanetPage(1, {
              prevPage: false,
              nextPage: true,
            });
          } else {
            this.appService.setPlanetPage(-1, {
              prevPage: true,
              nextPage: false,
            });
          }
          this._renderPlanet();
        }
      );
    });
  }

  handleSetPage(number: number) {
    this.appService.setPlanetPage(number);
    this._renderPlanet();
  }
}
