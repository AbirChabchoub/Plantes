import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCategoriesComponent } from './img-categories.component';

describe('ImgCategoriesComponent', () => {
  let component: ImgCategoriesComponent;
  let fixture: ComponentFixture<ImgCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
