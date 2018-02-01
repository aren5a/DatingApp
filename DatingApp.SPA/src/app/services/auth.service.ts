import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  userToken: any;
  baseUrl = 'http://localhost:5000/api/auth/';
  constructor(private http: Http) {}

  login(model: any) {

    return this.http.post(this.baseUrl + 'login', model, this.options()).map((response: Response) => {
        const user = response.json();
        if (user) {
            localStorage.setItem('token', user.tokenString);
            this.userToken = user.tokenString;
        }
    });
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.options());
  }

  options() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return options;
  }
}
