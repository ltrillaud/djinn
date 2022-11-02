import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkyComponent } from './linky.component';

describe('LinkyComponent', () => {
  let component: LinkyComponent;
  let fixture: ComponentFixture<LinkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
