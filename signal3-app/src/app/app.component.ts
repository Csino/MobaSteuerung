import { Component } from '@angular/core';
import { MqttService } from './services/mqtt.service';
import { ControlboardComponent } from "./control/controlboard/controlboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ControlboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private mqttService: MqttService) {}
}
