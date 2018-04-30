import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  baseUrl = 'http://localhost:5000/api/auth/';
  constructor(private http: Http) {}

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'login', model, this.options())
      .map((response: Response) => {
        const user = response.json();
        if (user) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            this.userToken = user.tokenString;
            return this.decodedToken;
        }
      }).catch(this.handleError);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.options()).catch(this.handleError);
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  options() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return options;
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStatError = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStatError += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStatError || 'Server Error'
    );
  }
}
