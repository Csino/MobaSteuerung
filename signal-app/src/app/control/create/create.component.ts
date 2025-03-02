import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol.component';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol.component';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol.component';
import { LeftSwitchSymbolComponent } from '../image/leftswitch.component';
import { RightSwitchSymbolComponent } from '../image/rightswitch.component';
import { DoubleCrossSwitchComponent } from '../image/doublecrossswitch.component';
import { SignalService } from "../../services/signal.service";
import { SwitchService } from "../../services/switch.service"; 

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
    MatButtonModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(
    private signalService: SignalService, // Hinzufügen des SignalService
    private switchService: SwitchService  // Hinzufügen des SwitchService
  ) { }

  selectedCategory: 'signal' | 'weiche' = 'signal';
  selectedSignalType: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | 'rechtsweiche' | 'linksweiche' | 'doppelkreuzweiche' | '' = '';
  signalId: string = ''; // Initialisierung der signalId
  isDuplicateId = false;
  associatedSwitches: string [] = []; // Initialisierung der associatedSwitchId

  validateSignalId(id: string): boolean {
    const signalPattern = /^S\d+$/;
    return signalPattern.test(id);
  }

  validateSwitchId(id: string): boolean {
    const switchPattern = /^W\d+$/;
    return switchPattern.test(id);
  }

  onSignalIdChange() {
    this.isDuplicateId = !this.signalService.isSignalIdUnique(this.signalId);
  }

  onSignalTypeChange() {
    // Keine automatische Aktualisierung mehr
  }

  getSymbolIcon(): Type<any> {
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
    this.associatedSwitches = []; // Zurücksetzen der Weichen
  }

  saveSignal(): void {
    if (this.signalId && this.selectedSignalType) {
      if (!this.validateSignalId(this.signalId)) {
        return;
      }

      const signalData = {
        type: this.selectedSignalType,
        id: this.signalId,
        switches: this.associatedSwitches
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

  addSwitch(switchId: string): void {
    if (this.validateSwitchId(switchId) && !this.isSwitchAdded(switchId)) {
      this.associatedSwitches.push(switchId);
    }
  }

  removeSwitch(switchId: string): void {
    const index = this.associatedSwitches.indexOf(switchId);
    if (index !== -1) {
      this.associatedSwitches.splice(index, 1);
    }
  }

  isSwitchAdded(switchId: string): boolean {
    return this.associatedSwitches.includes(switchId);
  }

  canAddSwitch(): boolean {
    return this.associatedSwitches.length < 2;
  }

  canRemoveSwitch(): boolean {  
    return this.associatedSwitches.length > 0;
  }

  onCategoryChange(): void {
    this.selectedSignalType = '';
    this.signalId = '';
    this.isDuplicateId = false;
  }

  onSymbolTypeChange(): void {
    this.signalId = '';
    this.isDuplicateId = false;
  }

  onSymbolIdChange(): void {
    // Nur Zahlen erlauben
    this.signalId = this.signalId.replace(/[^0-9]/g, '');
    
    const formattedId = this.getFormattedId();
    if (this.selectedCategory === 'signal') {
      this.isDuplicateId = !this.signalService.isSignalIdUnique(formattedId);
    } else {
      this.isDuplicateId = !this.switchService.isSwitchIdUnique(formattedId);
    }
  }

  validateId(id: string): boolean {
    if (!id) return true;
    return /^\d+$/.test(id);
  }

  getFormattedId(): string {
    if (!this.signalId) return 'Keine ID';
    const prefix = this.selectedCategory === 'signal' ? 'S' : 'W';
    return `${prefix}${this.signalId}`;
  }

  getSignalIcon(): Type<any> {
    if (this.selectedCategory === 'signal') {
      switch(this.selectedSignalType) {
        case 'blocksignal':
          return BlockSignalSymbolComponent;
        case 'einfahrsignal':
          return EntrySignalSymbolComponent;
        case 'ausfahrsignal':
          return ExitSignalSymbolComponent;
        default:
          return BlockSignalSymbolComponent; // Standardkomponente zurückgeben
      }
    } else if (this.selectedCategory === 'weiche') {
      switch(this.selectedSignalType) {
        case 'rechtsweiche':
          return RightSwitchSymbolComponent;
        case 'linksweiche':
          return LeftSwitchSymbolComponent;
        case 'doppelkreuzweiche':
          return DoubleCrossSwitchComponent;
        default:
          return RightSwitchSymbolComponent; // Standardkomponente zurückgeben
      }
    }
    return BlockSignalSymbolComponent; // Standardkomponente zurückgeben
  }
}
