import { Component } from '@angular/core';
import { SignaleComponent } from './signale/signale.component';
import { WeichenComponent } from './weichen/weichen.component';
import { EingabeComponent } from './eingabe/eingabe.component';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-steuerung',
  standalone: true,
  imports: [SignaleComponent,
            WeichenComponent,
            EingabeComponent,
            RouterModule,

  ],
  templateUrl: './steuerung.component.html',
  styleUrl: './steuerung.component.scss'
})
export class SteuerungComponent {

}
