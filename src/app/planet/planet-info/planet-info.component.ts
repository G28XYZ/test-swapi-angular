import { Component, Input, OnInit } from '@angular/core';
import { IPlanet } from 'src/utils/types';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss'],
})
export class PlanetInfoComponent implements OnInit {
  @Input() planet: IPlanet | undefined;

  constructor() {}

  ngOnInit(): void {}
}
