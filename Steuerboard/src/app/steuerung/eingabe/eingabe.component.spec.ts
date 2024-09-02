import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EingabeComponent } from './eingabe.component';

describe('ErstellenComponent', () => {
  let component: EingabeComponent;
  let fixture: ComponentFixture<EingabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EingabeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EingabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
