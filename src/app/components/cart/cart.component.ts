import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartListArray: any = [];
  totalAmount: number = 0;
  priceList: any = [];
  quantityList: any = [];
  isChecked:boolean = true;
  itemsPurchased:any = [];
  priceToPay:number= 0;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.cartListArray = JSON.parse(localStorage.getItem('cartItems') || '{}');
    this.cartListArray.forEach((elem: any, index: any) => {
      this.priceList.push(this.cartListArray[index].price);
    })
    this.priceList.forEach((elem: any, index: any) => {
      this.totalAmount += elem;
    })
    this.cartListArray.forEach((elem: any, index: any) => {
      this.quantityList.push(this.cartListArray[index].quantity);
    })
  }
  removeItemFromCart() {
    localStorage.removeItem('cartItems');
    this.cartListArray = [];
  }
  increaseQuantity(index: number) {
    this.quantityList[index] += 1;
    this.priceList[index] = this.priceList[index] + this.cartListArray[index].price;
    this.getTotalPrice(index);
  }
  decreaseQuantity(index: number) {
    if (this.quantityList[index] != 0) {
      this.quantityList[index] -= 1;
      this.priceList[index] = this.priceList[index] - this.cartListArray[index].price;
      this.getTotalPrice(index);
    }
  }
  getTotalPrice(index:number){
    let price = 0;
    this.priceList.forEach((elem:any,value:any)=>{
      price += elem;
    })
    this.totalAmount = price;
  }
  itemChecked(event:any,index:number){
    if(event.currentTarget.checked){
      this.isChecked = false;
      this.itemsPurchased.push(this.cartListArray[index].id);
      this.priceToPay += this.priceList[index];
    }
  }
  routeToPayment(){
    debugger
    let reqObj = {
      idArray: this.itemsPurchased,
      price: this.priceToPay,
    }
    this.router.navigate(['/payment', {my_object: JSON.stringify(reqObj)}]);
  }
}
