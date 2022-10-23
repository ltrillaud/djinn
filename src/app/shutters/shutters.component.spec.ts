/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShuttersComponent } from './shutters.component';

describe('ShuttersComponent', () => {
  let component: ShuttersComponent;
  let fixture: ComponentFixture<ShuttersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
