import { Component } from '@angular/core';
import { SignalDashboardComponent } from "../signal-dashboard/signal-dashboard.component";
import mqtt from "mqtt";
import { ButtonSignalComponent } from "../signal-dashboard/Button-Signal/Button-Signal.component";

@Component({
    selector: 'app-mqtt-modul',
    standalone: true,
    templateUrl: './mqtt-modul.component.html',
    styleUrl: './mqtt-modul.component.scss',
    // imports: [SignalDashboardComponent, ButtonSignalComponent]
})
export class MqttModulComponent {
[x: string]: any;
}

  const client = mqtt.connect("mqtt://192.168.2.135:8083"); // create a client


client.on("connect", () => {
      console.log ("verbunden");
    } 
)


const Signalmessage = () => {
  client.publish("/Moba/ESPNetzwerk", "Hp0");
}