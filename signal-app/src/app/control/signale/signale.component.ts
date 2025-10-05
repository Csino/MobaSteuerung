import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SignalService } from '../../services/signal.service';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol.component';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol.component';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol.component';
import { VorsignalSymbolComponent } from '../image/vorsignalsymbol.component';

interface SignalContainer {
  type: string;
  title: string;
  signals: {
    id: string;
    type: string;
  }[];
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
  styleUrls: ['./signale.component.scss']
})
export class SignaleComponent implements OnInit {
  containers: SignalContainer[] = [];
  containers$; // Nur Deklaration

  constructor(private signalService: SignalService) {
    this.containers$ = this.signalService.currentContainers; // Initialisierung im Konstruktor
    this.signalService.currentContainers.subscribe(containers => {
      this.containers = containers;
      console.log('Containers updated:', this.containers);
    });
  }

  ngOnInit() {
    // Initialisierung kann hier erfolgen, falls nötig
  }

  deleteSignal(type: string, id: string): void {
    this.signalService.removeSignal(type, id);  // Korrigierte Referenz
  }
}
