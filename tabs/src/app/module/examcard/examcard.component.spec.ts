import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamcardComponent } from './examcard.component';

describe('ExamcardComponent', () => {
  let component: ExamcardComponent;
  let fixture: ComponentFixture<ExamcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamcardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
