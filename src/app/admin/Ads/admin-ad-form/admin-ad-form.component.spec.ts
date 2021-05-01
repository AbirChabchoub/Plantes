import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdFormComponent } from './admin-ad-form.component';

describe('AdminAdFormComponent', () => {
  let component: AdminAdFormComponent;
  let fixture: ComponentFixture<AdminAdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
