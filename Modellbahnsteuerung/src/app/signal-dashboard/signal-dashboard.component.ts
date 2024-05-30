import { Component } from '@angular/core';
import { ButtonSignalComponent } from "./Button-Signal/Button-Signal.component";

@Component({
  selector: 'app-signal-dashboard',
  standalone: true,
  imports: [ButtonSignalComponent],
  templateUrl: './signal-dashboard.component.html',
  styleUrl: './signal-dashboard.component.scss'
})
export class SignalDashboardComponent {

}
