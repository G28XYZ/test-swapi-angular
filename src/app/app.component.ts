import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-swapi-angular';

  constructor(private appService: AppService) {}

  ngOnInit() {
    const storage = localStorage.getItem('planets');
    if (storage) {
      this.appService.state.request = false;
      this.appService.state.planets = JSON.parse(storage);
    }
    console.log('render app');
  }
}
