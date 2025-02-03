import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlboardComponent } from "./control/controlboard/controlboard.component";
import { SignalComponent } from "./control/signal/signal.component";
import { SwitchComponent } from "./control/switch/switch.component";
import { CreateComponent } from './control/create/create.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'create', pathMatch: 'full'
    },
    {
        path: 'create', component: CreateComponent
    },
    {
        path: 'signal', component: SignalComponent
    },
    {
        path: 'switch', component: SwitchComponent
    },
    { 
        path: 'controlboard',component: ControlboardComponent,
        
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }