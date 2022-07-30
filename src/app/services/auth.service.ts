import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  // sets token in local storage

  setToken(token:string){
    localStorage.setItem('authToken',token);
  }
  // gets token in local storage
  getToken():string | null{
    return localStorage.getItem('authToken');
  }
  isLoggedIn(){
    return this.getToken() !== null;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['./login']);
    window.location.reload;
  }
  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Kunal Gupta', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}
