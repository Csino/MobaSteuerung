import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMqttComponent } from './service-mqtt.component';

describe('ServiceMqttComponent', () => {
  let component: ServiceMqttComponent;
  let fixture: ComponentFixture<ServiceMqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMqttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
