import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalBoardComponent } from './signal-board.component';

describe('SignalBoardComponent', () => {
  let component: SignalBoardComponent;
  let fixture: ComponentFixture<SignalBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
