import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  productId:any = [];
  amount!:number;
  cartItemsList:any = [];
  indexArray:any = [];
  productPrice!:number;
  cardForm!:FormGroup;
  buyItemsList:any = [];

  constructor(private route: ActivatedRoute,private fb:FormBuilder,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('my_object') || '{}');
    this.productId = obj.idArray;
    this.amount = obj.price
    this.createForm();
    this.cartItemsList = JSON.parse(localStorage.getItem('cartItems') ||'{}');
    this.buyItemsList = JSON.parse(localStorage.getItem('buyItems') ||'{}');
    if(this.cartItemsList.length){
      this.productPrice = this.cartItemsList[0].price;
    }
    if(this.buyItemsList.length){
      this.productPrice = this.buyItemsList[0].price;
    }
  }
  createForm(){
    this.cardForm = this.fb.group({
      cardNumber : ['',[Validators.required,Validators.pattern('[0-9]*')]],
      cardHolderName:['',[Validators.required]],
      month: ['',[Validators.required]],
      year: ['',[Validators.required]],
      cvv: ['',[Validators.required]],
    })
  }
  get cardNumber(){
    return this.cardForm.get('cardForm');
  }
  get cardHolderName(){
    return this.cardForm.get('cardHolderName');
  }
  get month(){
    return this.cardForm.get('month');
  }
  get year(){
    return this.cardForm.get('year');
  }
  get cvv(){
    return this.cardForm.get('cvv');
  }
  proceedToPay(){
    if(this.cardForm.valid){
      if(!!this.amount){
        this.productId.forEach((elem:any,index:any)=>{
          this.indexArray.push(this.cartItemsList.findIndex((val:any)=>{
            return val.id == elem;
          }))
          this.cartItemsList.splice(this.indexArray[index],1);
        })
        localStorage.setItem('cartItems',JSON.stringify(this.cartItemsList));
      }
      else{
        localStorage.clear();
      }
      this.toastr.success("Thanx for Purchasing Item");
      this.router.navigate(['/cart']);
    }
    else{
      this.toastr.error("Error has ocuured");
      this.router.navigate(['/cart']);
    }
  }
}