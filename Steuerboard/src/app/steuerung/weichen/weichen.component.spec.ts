import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeichenComponent } from './weichen.component';

describe('WeichenComponent', () => {
  let component: WeichenComponent;
  let fixture: ComponentFixture<WeichenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeichenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeichenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
