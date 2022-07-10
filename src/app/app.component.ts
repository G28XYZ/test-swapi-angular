import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IState } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'test-swapi-angular';
  state$: Observable<IState>;

  constructor(private appService: AppService) {
    this.state$ = this.appService.state;
  }

  ngOnInit(): void {
    const storage = localStorage.getItem('mainState');
    if (storage) {
      this.appService.setStateFromStorage(JSON.parse(storage));
    }
    console.log('render app');
  }
}
