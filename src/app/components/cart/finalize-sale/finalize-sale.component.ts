import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedCartService } from '../../shared/services/shared-cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegexValidators } from '../validators/regex.validators';

@Component({
  selector: 'app-finalize-sale',
  templateUrl: './finalize-sale.component.html',
  styleUrls: ['./finalize-sale.component.scss'],
})
export class FinalizeSaleComponent implements OnInit, OnDestroy {
  @Output() btnClick: any = new EventEmitter();

  constructor(private router: Router) {}

  cardMember = new FormGroup(
    {
      cardNumber: new FormControl('', [Validators.required]),
      date: new FormControl(new Date().getDate(), [Validators.required]),
      CVV: new FormControl(0, [Validators.min(100), Validators.max(999)]),
      id: new FormControl(),
    },
    {
      validators: [RegexValidators.validateCardNumber, RegexValidators.dateValidator, RegexValidators.validateId]
    }
  );

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  closeModal() {
    this.btnClick.emit();
  }
  submit() {
    this.router.navigate(['goodbye']);
  }
}
