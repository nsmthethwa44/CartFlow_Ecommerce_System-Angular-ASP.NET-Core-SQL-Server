import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOverviewComponent } from './customer-overview-component';

describe('CustomerOverviewComponent', () => {
  let component: CustomerOverviewComponent;
  let fixture: ComponentFixture<CustomerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
