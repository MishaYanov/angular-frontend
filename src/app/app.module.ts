import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'
import { httpInterceptorProviders } from './components/shared/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MainComponent } from './components/layout/main/main.component';
import { HeroComponent } from './components/layout/hero/hero.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ButtonComponent } from './components/shared/UI/button/button.component';
import { ModalComponent } from './components/shared/UI/modal/modal.component';
import { ItemComponent } from './components/store/item/item.component';
import { ItemListComponent } from './components/store/item-list/item-list.component';
import { StoreLayoutComponent } from './components/layout/store-layout/store-layout.component';
import { NotFoundPageComponent } from './components/layout/not-found-page/not-found-page.component';
import { ContactMeComponent } from './components/layout/contact-me/contact-me.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { authGuards } from './components/auth/guards';
import { StoreNavComponent } from './components/store/store-nav/store-nav.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';
import { MultipleFilterPipePipe } from './components/store/pipes/multiple-filter-pipe.pipe';
import { AddProductFormComponent } from './components/admin/add-product-form/add-product-form.component';
import { EditProductFormComponent } from './components/admin/edit-product-form/edit-product-form.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { IsExistInCartPipe } from './components/cart/guards/is-exist-in-cart.pipe';
import { ItemsHandlerPipe } from './components/cart/guards/items-handler.pipe';
import { cartGuards } from './components/cart/guards';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { EndJourneyComponent } from './components/cart/end-journey/end-journey.component';
import { FinalizeSaleComponent } from './components/cart/finalize-sale/finalize-sale.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HeroComponent,
    LoginComponent,
    RegisterComponent,
    ButtonComponent,
    ModalComponent,
    ItemComponent,
    ItemListComponent,
    StoreLayoutComponent,
    NotFoundPageComponent,
    ContactMeComponent,
    LogoutComponent,
    StoreNavComponent,
    AdminPageComponent,
    UserPageComponent,
    MultipleFilterPipePipe,
    AddProductFormComponent,
    EditProductFormComponent,
    CartComponent,
    CheckoutComponent,
    EndJourneyComponent,
    FinalizeSaleComponent,
    IsExistInCartPipe,
    ItemsHandlerPipe,
    CartItemComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
  ],
  providers: [httpInterceptorProviders, authGuards, cartGuards],
  bootstrap: [AppComponent]
})
export class AppModule { }
