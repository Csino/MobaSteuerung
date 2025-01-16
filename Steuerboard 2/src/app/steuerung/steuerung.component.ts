import { Component } from '@angular/core';
import { SignaleComponent } from './signale/signale.component';
import { WeichenComponent } from './weichen/weichen.component';
import { EingabeComponent } from './eingabe/eingabe.component';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { CardComponent } from "./card/card.component";

@Component({
  selector: 'app-steuerung',
  standalone: true,
  imports: [
    RouterModule, CardComponent],
  templateUrl: './steuerung.component.html',
  styleUrl: './steuerung.component.scss'
})
export class SteuerungComponent {

}
