import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlboardComponent } from './controlboard.component';

describe('ControlboardComponent', () => {
  let component: ControlboardComponent;
  let fixture: ComponentFixture<ControlboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
