import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciselistPage } from './exerciselist.page';

describe('ExerciselistPage', () => {
  let component: ExerciselistPage;
  let fixture: ComponentFixture<ExerciselistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciselistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciselistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
