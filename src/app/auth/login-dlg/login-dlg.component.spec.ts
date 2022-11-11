import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDlgComponent } from './login-dlg.component';

describe('LoginDlgComponent', () => {
  let component: LoginDlgComponent;
  let fixture: ComponentFixture<LoginDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginDlgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
