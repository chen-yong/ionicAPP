import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlabPage } from './addlab.page';

describe('AddlabPage', () => {
  let component: AddlabPage;
  let fixture: ComponentFixture<AddlabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
