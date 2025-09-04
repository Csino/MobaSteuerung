import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MqttService } from './services/mqtt.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [MqttService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the MqttService injected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mqttService = TestBed.inject(MqttService);
    expect(mqttService).toBeTruthy();
  });
});
