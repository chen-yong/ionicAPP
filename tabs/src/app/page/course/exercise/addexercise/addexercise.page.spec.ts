import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexercisePage } from './addexercise.page';

describe('AddexercisePage', () => {
  let component: AddexercisePage;
  let fixture: ComponentFixture<AddexercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddexercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
