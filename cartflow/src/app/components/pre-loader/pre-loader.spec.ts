import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoader } from './pre-loader';

describe('PreLoader', () => {
  let component: PreLoader;
  let fixture: ComponentFixture<PreLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
