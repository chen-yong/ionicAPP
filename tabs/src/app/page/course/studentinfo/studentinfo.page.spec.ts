import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinfoPage } from './studentinfo.page';

describe('StudentinfoPage', () => {
  let component: StudentinfoPage;
  let fixture: ComponentFixture<StudentinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
