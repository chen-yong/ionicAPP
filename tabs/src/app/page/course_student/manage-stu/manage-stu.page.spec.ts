import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStuPage } from './manage-stu.page';

describe('ManageStuPage', () => {
  let component: ManageStuPage;
  let fixture: ComponentFixture<ManageStuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
