import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStuPage } from './work-stu.page';

describe('WorkStuPage', () => {
  let component: WorkStuPage;
  let fixture: ComponentFixture<WorkStuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkStuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
