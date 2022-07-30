import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private baseUrl:string = "assets/products-data.json";

  constructor(private http:HttpClient) { }

  getProductsData(){
    return this.http.get(this.baseUrl);
  }
  
}
