/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { T1fosComponent } from './t1fos.component';

describe('T1fosComponent', () => {
  let component: T1fosComponent;
  let fixture: ComponentFixture<T1fosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T1fosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T1fosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
