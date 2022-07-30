import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUp!:FormGroup;

  constructor(private router:Router,private toastr:ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      address: ['',[Validators.required]],
      city: ['',[Validators.required]],
      state : ['',[Validators.required]],
      zip : ['',[Validators.required]], 
    })
  }

  get email(){
    return this.signUp.get('email');
  }
  get password(){
    return this.signUp.get('password');
  }
  get address(){
    return this.signUp.get("address");
  }
  get city(){
    return this.signUp.get('city');
  }
  get state(){
    return this.signUp.get('state');
  }
  get zip(){
    return this.signUp.get('zip');
  }

  routeToLogin(){
    this.toastr.success("Account created successfully");
    this.router.navigate(['../login']);
  }

}
