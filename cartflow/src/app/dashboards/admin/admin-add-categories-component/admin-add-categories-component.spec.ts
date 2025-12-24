import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCategoriesComponent } from './admin-add-categories-component';

describe('AdminAddCategoriesComponent', () => {
  let component: AdminAddCategoriesComponent;
  let fixture: ComponentFixture<AdminAddCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
