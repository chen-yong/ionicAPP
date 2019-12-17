import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestgradePage } from './testgrade.page';

describe('TestgradePage', () => {
  let component: TestgradePage;
  let fixture: ComponentFixture<TestgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestgradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
