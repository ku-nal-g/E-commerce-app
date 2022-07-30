import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'assets/customers-data.json';

  getCustomersData():Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
