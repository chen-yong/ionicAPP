import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditworkPage } from './editwork.page';

describe('EditworkPage', () => {
  let component: EditworkPage;
  let fixture: ComponentFixture<EditworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
