import { Component, ViewChild, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html',
  styleUrls: ['main-menu.component.scss']
})
export default class MainMenu implements OnInit {
  private k: string;

  @ViewChild(MatMenuTrigger, { static: true }) trigger: MatMenuTrigger;

  ngOnInit(): void {
    this.k = 'we';
    this.trigger.openMenu();
  }
}
