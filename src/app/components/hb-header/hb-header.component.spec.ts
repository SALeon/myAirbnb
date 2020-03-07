import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import HbHeaderComponent from './hb-header.component';

describe('HbHeaderComponent', () => {
  let component: HbHeaderComponent;
  let fixture: ComponentFixture<HbHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HbHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
