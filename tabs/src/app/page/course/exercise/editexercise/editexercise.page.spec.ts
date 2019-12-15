import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexercisePage } from './editexercise.page';

describe('EditexercisePage', () => {
  let component: EditexercisePage;
  let fixture: ComponentFixture<EditexercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditexercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditexercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
