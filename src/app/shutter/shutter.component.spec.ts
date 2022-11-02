import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShutterComponent } from './shutter.component';

describe('ShutterComponent', () => {
  let component: ShutterComponent;
  let fixture: ComponentFixture<ShutterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShutterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShutterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
