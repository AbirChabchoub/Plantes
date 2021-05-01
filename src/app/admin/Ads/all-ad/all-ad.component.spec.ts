import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdComponent } from './all-ad.component';

describe('AllAdComponent', () => {
  let component: AllAdComponent;
  let fixture: ComponentFixture<AllAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
