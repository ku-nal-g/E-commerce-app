import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isShow:boolean = true;

  constructor(private fb:FormBuilder,private auth: AuthService, private router: Router, private toastr: ToastrService) { 
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  showText(){
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  login(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe((res)=>{
        this.toastr.success("Success", "Admin Logged in Successfully");
        this.router.navigate(['/dashboard']);
        localStorage.setItem('userName','Admin');
      },
      (err)=>{
        this.toastr.error("Please fill admin credentials!!!");
      })
    }
  }

}
