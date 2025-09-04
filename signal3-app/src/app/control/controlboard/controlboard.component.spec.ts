import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ControlboardComponent } from './controlboard.component';
import { MqttService } from '../../services/mqtt.service';

describe('ControlboardComponent', () => {
  let component: ControlboardComponent;
  let fixture: ComponentFixture<ControlboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlboardComponent, RouterModule.forRoot([])],
      providers: [MqttService]
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
