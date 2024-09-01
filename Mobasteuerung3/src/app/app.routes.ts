import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EingabeComponent } from './steuerung/eingabe/eingabe.component';
import { SignaleComponent } from './steuerung/signale/signale.component';
import { WeichenComponent } from './steuerung/weichen/weichen.component';
import { SteuerungComponent } from './steuerung/steuerung.component';

const routes: Routes = [
  { path: '', component: SteuerungComponent },
  { path: 'eingabe', component: EingabeComponent },
  { path: 'signale', component: SignaleComponent },
  { path: 'weichen', component: WeichenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
