import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalize-sale',
  templateUrl: './finalize-sale.component.html',
  styleUrls: ['./finalize-sale.component.scss']
})
export class FinalizeSaleComponent implements OnInit, OnDestroy {

  private flag = false;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
      this.flag = false;
  }

  closeModal(){
    this.flag = false;
  }
}
