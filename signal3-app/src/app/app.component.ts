import { Component, OnInit } from '@angular/core';
import { MqttService } from './services/mqtt.service';
import { ControlboardComponent } from "./control/controlboard/controlboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ControlboardComponent]
})
export class AppComponent implements OnInit {
  constructor(private mqttService: MqttService) {}

  ngOnInit(): void {
    // Beispiel: Nachricht senden
    this.mqttService.publishMessage('test/topic', 'Hello MQTT');
  }
}
