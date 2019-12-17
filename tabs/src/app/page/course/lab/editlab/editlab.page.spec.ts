import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlabPage } from './editlab.page';

describe('EditlabPage', () => {
  let component: EditlabPage;
  let fixture: ComponentFixture<EditlabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
