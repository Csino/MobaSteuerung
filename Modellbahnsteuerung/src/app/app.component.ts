import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalDashboardComponent } from "./signal-dashboard/signal-dashboard.component";
import { MqttModulComponent } from "./mqtt-modul/mqtt-modul.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SignalDashboardComponent, MqttModulComponent,]
})


export class AppComponent {
  title = 'Modellbahnsteuerung';
}
