import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawplotsListPage } from './drawplots-list.page';

describe('DrawplotsListPage', () => {
  let component: DrawplotsListPage;
  let fixture: ComponentFixture<DrawplotsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawplotsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawplotsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
