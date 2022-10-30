import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Output() completeCart:any = {}

  deliveryForm: any = new FormGroup({
    city: new FormControl(),
    address: new FormControl(),
    
  })

  //add user model user shared-user
  
  //add cart model use shared-cart
  public cart:any[] =[]

  //add delivery model and shared-cart
  public delivery ={}

  //shared user.
  //shared cart.
  //cart
  constructor() { }

  ngOnInit(): void {
    //check if cart exists? no - pull cart
  }

  invokeSavedAddress(){
    //get user 
  }
  resetDelivery(){
    // clear form
  }

  saveDelivery(){
    //update rxjs
    //update db
  }
  
saveAndExit(){
    this.saveDelivery()
    //navigate to store
  }

  deleteCartAndDelivery(){
    //reset fields.
    //delete cart + create new cart
  }

  submitInfo(){
    //validate and open payment modal.
  }
}
