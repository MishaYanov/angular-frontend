import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndJourneyComponent } from './end-journey.component';

describe('EndJourneyComponent', () => {
  let component: EndJourneyComponent;
  let fixture: ComponentFixture<EndJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndJourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
