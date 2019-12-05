import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentPage } from './addstudent.page';

describe('AddstudentPage', () => {
  let component: AddstudentPage;
  let fixture: ComponentFixture<AddstudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
