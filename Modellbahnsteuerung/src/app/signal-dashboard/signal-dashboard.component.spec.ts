import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDashboardComponent } from './signal-dashboard.component';

describe('SignalDashboardComponent', () => {
  let component: SignalDashboardComponent;
  let fixture: ComponentFixture<SignalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
