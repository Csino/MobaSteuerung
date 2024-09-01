import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SteuerungComponent } from './steuerung/steuerung.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SteuerungComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Steuerboard';
}
