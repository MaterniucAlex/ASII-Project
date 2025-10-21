import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartApp } from './start-app';

describe('StartApp', () => {
  let component: StartApp;
  let fixture: ComponentFixture<StartApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
