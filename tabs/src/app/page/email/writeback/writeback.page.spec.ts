import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritebackPage } from './writeback.page';

describe('WritebackPage', () => {
  let component: WritebackPage;
  let fixture: ComponentFixture<WritebackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritebackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritebackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
