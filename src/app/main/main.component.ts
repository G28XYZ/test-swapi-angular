import { Component, Input, OnInit } from '@angular/core';
import { IPlanets } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() request: boolean = true;
  @Input() planets: IPlanets[] | [] = [];

  constructor() {}

  ngOnInit(): void {}
}
