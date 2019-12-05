import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadworkPage } from './readwork.page';

describe('ReadworkPage', () => {
  let component: ReadworkPage;
  let fixture: ComponentFixture<ReadworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
