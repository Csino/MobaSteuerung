import { Component, OnInit, ChangeDetectionStrategy, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol.component';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol.component';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol.component';
import { VorsignalSymbolComponent } from '../image/vorsignalsymbol.component';
import { SignalService } from '../../services/signal.service';

type SignalComponentType = Type<BlockSignalSymbolComponent | EntrySignalSymbolComponent | ExitSignalSymbolComponent | VorsignalSymbolComponent>;

import { Signal } from '../../services/signal.service';

interface SignalContainer {
  type: string;
  title: string;
  signals: Signal[];
}

@Component({
  selector: 'app-signale',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BlockSignalSymbolComponent,
    EntrySignalSymbolComponent,
    ExitSignalSymbolComponent,
    VorsignalSymbolComponent
  ],
  templateUrl: './signale.component.html',
  styleUrls: ['./signale.component.scss'],
  host: {
    'class': 'signal-component-host',
    'style': 'display: block'
  }
})
export class SignaleComponent implements OnInit {
  containers: SignalContainer[] = [];

  constructor(private signalService: SignalService) {}

  ngOnInit() {
    // Initialisiere die Container
    this.containers = this.signalService.currentContainers();
    console.log('SignaleComponent Containers:', this.containers);
  }

  deleteSignal(type: string, id: string): void {
    this.signalService.removeSignal(type, id);
  }

  getSignalComponent(type: string): SignalComponentType | null {
    switch(type) {
      case 'blocksignal':
        return BlockSignalSymbolComponent;
      case 'einfahrsignal':
        return EntrySignalSymbolComponent;
      case 'ausfahrsignal':
        return ExitSignalSymbolComponent;
      case 'vorsignal':
        return VorsignalSymbolComponent;
      default:
        return null;
    }
  }
}
