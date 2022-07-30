import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  // if path is empty or url is empty it will redirect to home 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  //protected path
  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    component: DashboardComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
