import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailwritePage } from './emailwrite.page';

describe('EmailwritePage', () => {
  let component: EmailwritePage;
  let fixture: ComponentFixture<EmailwritePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailwritePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailwritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
