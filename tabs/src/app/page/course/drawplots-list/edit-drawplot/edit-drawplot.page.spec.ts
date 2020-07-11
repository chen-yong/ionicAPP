import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrawplotPage } from './edit-drawplot.page';

describe('EditDrawplotPage', () => {
  let component: EditDrawplotPage;
  let fixture: ComponentFixture<EditDrawplotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDrawplotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrawplotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
