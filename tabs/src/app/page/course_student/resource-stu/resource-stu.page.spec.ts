import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceStuPage } from './resource-stu.page';

describe('ResourceStuPage', () => {
  let component: ResourceStuPage;
  let fixture: ComponentFixture<ResourceStuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceStuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceStuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
