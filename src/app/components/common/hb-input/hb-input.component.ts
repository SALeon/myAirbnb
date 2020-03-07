import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hb-input',
  templateUrl: './hb-input.component.html',
  styleUrls: ['./hb-input.component.scss']
})
export default class HbInputComponent implements OnInit {
  private value: string;

  ngOnInit() {
    this.value = '';
  }
}
