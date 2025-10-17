import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWindow } from './app-window';

describe('AppWindow', () => {
  let component: AppWindow;
  let fixture: ComponentFixture<AppWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
