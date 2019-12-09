import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisegradePage } from './exercisegrade.page';

describe('ExercisegradePage', () => {
  let component: ExercisegradePage;
  let fixture: ComponentFixture<ExercisegradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisegradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisegradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
