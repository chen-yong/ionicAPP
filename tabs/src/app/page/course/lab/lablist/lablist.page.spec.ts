import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LablistPage } from './lablist.page';

describe('LablistPage', () => {
  let component: LablistPage;
  let fixture: ComponentFixture<LablistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LablistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LablistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
