import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstudentPage } from './editstudent.page';

describe('EditstudentPage', () => {
  let component: EditstudentPage;
  let fixture: ComponentFixture<EditstudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
