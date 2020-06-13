import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowemailPage } from './showemail.page';

describe('ShowemailPage', () => {
  let component: ShowemailPage;
  let fixture: ComponentFixture<ShowemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowemailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
