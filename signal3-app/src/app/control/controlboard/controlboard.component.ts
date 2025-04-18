import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';


@Component({
  selector: 'app-controlboard',
  templateUrl: './controlboard.component.html',
  styleUrls: ['./controlboard.component.scss'],
  imports: [RouterLink,
    RouterOutlet
    ],
  standalone: true
})
export class ControlboardComponent {}
