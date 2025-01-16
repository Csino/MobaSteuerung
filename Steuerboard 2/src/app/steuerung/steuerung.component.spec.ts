import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteuerungComponent } from './steuerung.component';

describe('SteuerungComponent', () => {
  let component: SteuerungComponent;
  let fixture: ComponentFixture<SteuerungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteuerungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteuerungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
