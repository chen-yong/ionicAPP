import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabgradePage } from './labgrade.page';

describe('LabgradePage', () => {
  let component: LabgradePage;
  let fixture: ComponentFixture<LabgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabgradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
