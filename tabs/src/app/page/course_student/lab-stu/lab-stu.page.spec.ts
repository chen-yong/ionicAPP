import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabStuPage } from './lab-stu.page';

describe('LabStuPage', () => {
  let component: LabStuPage;
  let fixture: ComponentFixture<LabStuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabStuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabStuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
