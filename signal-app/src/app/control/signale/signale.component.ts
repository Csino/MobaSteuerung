import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ControlCreateService } from '../../services/control-create.service';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol';

@Component({
  selector: 'app-signale',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BlockSignalSymbolComponent,
    EntrySignalSymbolComponent,
    ExitSignalSymbolComponent
  ],
  templateUrl: './signale.component.html',
  styleUrls: ['./signale.component.scss']
})
export class SignaleComponent {
  containers$;

  constructor(private controlCreateService: ControlCreateService) {
    this.containers$ = this.controlCreateService.currentContainers;
  }

  // Hilfsmethode zum Überprüfen des Typs
  getSignalComponent(type: string): any {
    switch(type) {
      case 'blocksignal':
        return BlockSignalSymbolComponent;
      case 'einfahrsignal':
        return EntrySignalSymbolComponent;
      case 'ausfahrsignal':
        return ExitSignalSymbolComponent;
      default:
        return null;
    }
  }
}
