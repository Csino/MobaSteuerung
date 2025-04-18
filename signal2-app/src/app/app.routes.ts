import { Routes } from '@angular/router';
import { SwitchDoublecrossComponent } from './switch-doublecross.component';

export const routes: Routes = [
  { path: '', component: SwitchDoublecrossComponent },
  { path: '**', redirectTo: '' }
];
