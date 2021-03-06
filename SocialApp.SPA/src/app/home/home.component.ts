import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() { }

  ngOnInit() {
  }
  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterModel(registermode: boolean) {
    this.registerMode = registermode;
  }
}
