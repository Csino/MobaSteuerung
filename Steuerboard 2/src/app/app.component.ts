import { Component } from '@angular/core';
import { SteuerungComponent } from './steuerung/steuerung.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [    
    SteuerungComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Steuerboard';
}
