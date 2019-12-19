import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaillistPage } from './maillist.page';

describe('MaillistPage', () => {
  let component: MaillistPage;
  let fixture: ComponentFixture<MaillistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaillistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaillistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
