import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupListComponent } from './category-group-list.component';

describe('CategoryGroupListComponent', () => {
  let component: CategoryGroupListComponent;
  let fixture: ComponentFixture<CategoryGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
