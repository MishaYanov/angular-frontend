import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-end-journey',
  templateUrl: './end-journey.component.html',
  styleUrls: ['./end-journey.component.scss']
})
export class EndJourneyComponent implements OnInit {

  creditCard = new FormGroup({
    cardNumber:  new FormControl(''), //custom validator
    expDate: new FormControl(''), //custom validator
    CVV: new FormControl('', [Validators.requiredTrue, Validators.min(3), Validators.max(3)]), 
    userId: new FormControl(''), //custom validator
  })

  constructor() { }

  ngOnInit(): void {
  }

}
