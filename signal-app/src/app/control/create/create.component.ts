import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol';
import { SignalService } from "../../services/signal.service";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private signalService: SignalService) { }

  selectedSignalType: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | '' = '';
  signalId: string = ''; // Initialisierung der signalId
  isDuplicateId = false;

  onSignalIdChange() {
    // Nur Duplikatsprüfung durchführen, keine Daten senden
    this.isDuplicateId = !this.signalService.isSignalIdUnique(this.signalId);
  }

  onSignalTypeChange() {
    // Keine automatische Aktualisierung mehr
  }

  getSignalIcon(): Type<any> {
    switch(this.selectedSignalType) {
      case 'blocksignal':
        return BlockSignalSymbolComponent;
      case 'einfahrsignal':
        return EntrySignalSymbolComponent;
      case 'ausfahrsignal':
        return ExitSignalSymbolComponent;
      default:
        return BlockSignalSymbolComponent;
    }
  }

  resetForm() {
    this.selectedSignalType = '';
    this.signalId = '';
    this.isDuplicateId = false;
  }

  saveSignal(): void {
    if (this.signalId && this.selectedSignalType) {
      const signalData = {
        type: this.selectedSignalType,
        id: this.signalId
      };

      const success = this.signalService.saveSignal(signalData);

      if (success) {
        this.isDuplicateId = false;
        this.resetForm();
      } else {
        this.isDuplicateId = true;
      }
    }
  }
}
