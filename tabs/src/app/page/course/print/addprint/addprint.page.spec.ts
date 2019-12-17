import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprintPage } from './addprint.page';

describe('AddprintPage', () => {
  let component: AddprintPage;
  let fixture: ComponentFixture<AddprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
