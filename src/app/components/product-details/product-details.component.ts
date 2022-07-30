import { ProductDataService } from './../../services/product-data.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productsList:any = [];
  cartArray:any = [];
  buyNowItems:any = [];

  constructor(private productsData:ProductDataService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.productsData.getProductsData().subscribe((res)=>{
      this.productsList = res;
    })
  }

  addItemToCart(index:number){
    this.cartArray.push(this.productsList[index]);
    localStorage.setItem('cartItems',JSON.stringify(this.cartArray));
    this.toastr.success("Added to cart Successfully");
  }
  buyNow(index:number){
    this.buyNowItems.push(this.productsList[index]);
    localStorage.setItem('buyItems',JSON.stringify(this.buyNowItems));
    this.router.navigate(['/payment']);
  }
}
