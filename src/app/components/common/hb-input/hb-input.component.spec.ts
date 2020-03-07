import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import HbInputComponent from './hb-input.component';

describe('HbInputComponent', () => {
  let component: HbInputComponent;
  let fixture: ComponentFixture<HbInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HbInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
