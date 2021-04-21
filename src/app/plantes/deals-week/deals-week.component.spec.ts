import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsWeekComponent } from './deals-week.component';

describe('DealsWeekComponent', () => {
  let component: DealsWeekComponent;
  let fixture: ComponentFixture<DealsWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
