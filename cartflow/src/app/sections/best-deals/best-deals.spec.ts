import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDeals } from './best-deals';

describe('BestDeals', () => {
  let component: BestDeals;
  let fixture: ComponentFixture<BestDeals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestDeals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestDeals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
