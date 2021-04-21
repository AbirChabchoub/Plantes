import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDealsComponent } from './img-deals.component';

describe('ImgDealsComponent', () => {
  let component: ImgDealsComponent;
  let fixture: ComponentFixture<ImgDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
