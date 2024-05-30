import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttModulComponent } from './mqtt-modul.component';

describe('MqttModulComponent', () => {
  let component: MqttModulComponent;
  let fixture: ComponentFixture<MqttModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MqttModulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MqttModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
