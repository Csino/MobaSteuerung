import { Component } from '@angular/core';
import { ControlboardComponent } from "./control/controlboard/controlboard.component";

@Component({
  selector: 'app-root',
  imports: [    
    ControlboardComponent,    
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-app';
}
