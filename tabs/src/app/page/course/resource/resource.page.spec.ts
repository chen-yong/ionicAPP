import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePage } from './resource.page';

describe('ResourcePage', () => {
  let component: ResourcePage;
  let fixture: ComponentFixture<ResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
