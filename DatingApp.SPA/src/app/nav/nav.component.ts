import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {
  model: any= {};
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
  }

}
