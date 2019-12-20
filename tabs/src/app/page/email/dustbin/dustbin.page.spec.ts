import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DustbinPage } from './dustbin.page';

describe('DustbinPage', () => {
  let component: DustbinPage;
  let fixture: ComponentFixture<DustbinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DustbinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DustbinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
