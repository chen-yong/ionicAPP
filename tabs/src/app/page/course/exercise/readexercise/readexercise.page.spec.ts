import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadexercisePage } from './readexercise.page';

describe('ReadexercisePage', () => {
  let component: ReadexercisePage;
  let fixture: ComponentFixture<ReadexercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadexercisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadexercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
