import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent implements OnInit {
  @Output() handleChangeGender = new EventEmitter();
  @Input() gender: string = 'all';

  constructor() {}

  ngOnInit(): void {}

  changeFilter(gender: string) {
    this.handleChangeGender.emit(gender);
  }
}
