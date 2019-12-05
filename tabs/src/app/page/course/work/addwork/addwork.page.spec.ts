import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddworkPage } from './addwork.page';

describe('AddworkPage', () => {
  let component: AddworkPage;
  let fixture: ComponentFixture<AddworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
