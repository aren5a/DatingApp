import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { error } from 'util';


@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any= {};
  @Output() cancelRegister = new EventEmitter();

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('successful');
    }, error => {
      console.log('not successful');
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
