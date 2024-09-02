import { Routes } from '@angular/router';
import { EingabeComponent } from "./steuerung/eingabe/eingabe.component";
import { SignaleComponent } from "./steuerung/signale/signale.component";
import { WeichenComponent } from "./steuerung/weichen/weichen.component";

export const routes: Routes = [
    { path: 'eingabe', component: EingabeComponent },
    { path: 'signale', component: SignaleComponent },
    { path: 'weichen', component: WeichenComponent },
];
