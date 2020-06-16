import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesStuPage } from './grades-stu.page';

describe('GradesStuPage', () => {
  let component: GradesStuPage;
  let fixture: ComponentFixture<GradesStuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesStuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesStuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
