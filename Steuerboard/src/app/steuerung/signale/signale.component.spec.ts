import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaleComponent } from './signale.component';

describe('SignalComponent', () => {
  let component: SignaleComponent;
  let fixture: ComponentFixture<SignaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
