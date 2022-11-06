import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { EditProductFormComponent } from './components/admin/edit-product-form/edit-product-form.component';
import { AdminGuard } from './components/auth/guards/admin.guard';
import { LoggedInGuard } from './components/auth/guards/logged-in.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { EndJourneyComponent } from './components/cart/end-journey/end-journey.component';
import { ContactMeComponent } from './components/layout/contact-me/contact-me.component';
import { HeroComponent } from './components/layout/hero/hero.component';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { StoreLayoutComponent } from './components/layout/store-layout/store-layout.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';

const routes: Routes = [
  //open routes
  {path: "home", component: HeroComponent},
  {path: "Login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path: "contact", component: ContactMeComponent},
  //closed routes
  {path: "store", component: StoreLayoutComponent, canActivate: [LoggedInGuard], children: []},
  {path: "user", component: UserPageComponent, canActivate: [LoggedInGuard], children: []},
  {path: "cart", component: CartComponent, canActivate: [LoggedInGuard], children: []},
  {path: "checkout", component: CheckoutComponent, canActivate: [LoggedInGuard]},
  {path: 'goodbye', component: EndJourneyComponent, canActivate: [LoggedInGuard]},

  //admin routes
  {path: "admin", component: AdminPageComponent, canActivate: [AdminGuard], children: []},
  {path: "admin/edit-product/:id", component: EditProductFormComponent, canActivate: [AdminGuard], children: []},

  //default route and 404
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
