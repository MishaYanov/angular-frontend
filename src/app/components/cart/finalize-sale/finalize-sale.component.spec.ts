import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeSaleComponent } from './finalize-sale.component';

describe('FinalizeSaleComponent', () => {
  let component: FinalizeSaleComponent;
  let fixture: ComponentFixture<FinalizeSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizeSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
