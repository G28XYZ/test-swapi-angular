import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-swapi-angular';

  constructor() {}

  ngOnInit() {
    console.log('render app');
  }
}
