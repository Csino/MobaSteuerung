import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlboardComponent } from "./control/controlboard/controlboard.component";
import { SignaleComponent } from "./control/signale/signale.component";
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
        path: 'signale', component: SignaleComponent
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