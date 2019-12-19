import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailwriteComponent } from './emailwrite.component';

describe('EmailwriteComponent', () => {
  let component: EmailwriteComponent;
  let fixture: ComponentFixture<EmailwriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailwriteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
