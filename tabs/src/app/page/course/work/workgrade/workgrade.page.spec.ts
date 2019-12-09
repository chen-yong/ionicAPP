import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgradePage } from './workgrade.page';

describe('WorkgradePage', () => {
  let component: WorkgradePage;
  let fixture: ComponentFixture<WorkgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
