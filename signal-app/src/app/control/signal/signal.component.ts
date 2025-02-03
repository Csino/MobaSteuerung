import { Component } from '@angular/core';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol';
import { EntrySignalSymbolComponent } from "../image/entrysignalsymbol";
import { BlockSignalSymbolComponent } from "../image/blocksignalsymbol";


@Component({
  selector: 'app-signal',
  imports: [
    ExitSignalSymbolComponent,
    EntrySignalSymbolComponent,
    BlockSignalSymbolComponent,   
  ],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent {

}
