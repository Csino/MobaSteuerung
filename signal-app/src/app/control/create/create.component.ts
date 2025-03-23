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

// Neue Enum-Definition am Anfang der Datei
enum ElementType {
  SIGNAL = 'signal',
  SWITCH = 'weiche',
  CONTROL_ELEMENT = 'control_element'
}

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
  readonly ElementType = ElementType; // Für Template-Zugriff
  selectedCategory: ElementType = ElementType.CONTROL_ELEMENT; // Standardmäßig auf CONTROL_ELEMENT gesetzt

  
  selectedSignalType: 'blocksignal' | 'einfahrsignal' | 'ausfahrsignal' | '' = '';
  selectedSwitchType: 'rechtsweiche' | 'linksweiche' | 'doppelkreuzweiche' | '' = '';
  elementId: string = ''; // Initialisierung der elementId
  isDuplicateId = false;
  associatedSwitches: string [] = []; // Initialisierung der associatedSwitchId

  constructor(
    private signalService: SignalService, // Hinzufügen des SignalService
    private switchService: SwitchService  // Hinzufügen des SwitchService
  ) { }

  validateSignalId(id: string): boolean {
    const signalPattern = /^S\d+$/;
    return signalPattern.test(id);
  }

  validateSwitchId(id: string): boolean {
    const switchPattern = /^W\d+$/;
    return switchPattern.test(id);
  }

  onSymbolIdChange(): void {
    this.elementId = this.elementId.replace(/[^0-9]/g, '');
    const formattedId = this.getFormattedId();
    
    if (!formattedId) {
      this.isDuplicateId = false;
      return;
    }
    
    if (this.selectedSignalType) {
      this.isDuplicateId = !this.signalService.isSignalIdUnique(formattedId);
    } else if (this.selectedSwitchType) {
      this.isDuplicateId = !this.switchService.isSwitchIdUnique(formattedId);
    }
  }

  saveSignal(): void {
    if (this.elementId && this.selectedSignalType) {
      const formattedId = `S${this.elementId}`;
      if (!this.validateSignalId(formattedId)) {
        return;
      }

      const signalData = {
        type: this.selectedSignalType,
        id: formattedId,
        signalId: this.elementId,
        switches: this.associatedSwitches
      };

      const success = this.signalService.saveSignal(signalData);

      if (success) {
        this.isDuplicateId = false;
        this.onReset();
      } else {
        this.isDuplicateId = true;
      }
    }
  }

  saveSwitch(): void {
    if (!this.elementId || !this.selectedSwitchType) {
      console.log('Missing data:', { id: this.elementId, type: this.selectedSwitchType });
      return;
    }

    const formattedId = `W${this.elementId}`;
    console.log('Formatted ID:', formattedId);

    const switchData = {
      type: this.selectedSwitchType,
      id: formattedId
    };

    console.log('Saving switch:', switchData);
    const success = this.switchService.saveSwitch(switchData);
    
    if (success) {
      console.log('Switch saved successfully');
      this.isDuplicateId = false;
      this.onReset();
    } else {
      console.log('Failed to save switch');
      this.isDuplicateId = true;
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
    this.selectedSwitchType = '';
    this.elementId = '';
    this.isDuplicateId = false;
  }

  onSymbolTypeChange(): void {
    this.elementId = '';
    this.isDuplicateId = false;
    // Signal oder Switch Type setzen
    if (this.selectedCategory === ElementType.SIGNAL) {
      this.selectedSwitchType = '';
    } else {
      this.selectedSignalType = '';
    }
  }

  validateId(id: string): boolean {
    if (!id) return false;
    const prefix = this.selectedCategory === ElementType.SIGNAL ? 'S' : 'W';
    const pattern = new RegExp(`^${prefix}\\d+$`);
    return pattern.test(id);
  }

  getFormattedId(): string {
    if (!this.elementId) return '';
    const prefix = this.selectedCategory === ElementType.SIGNAL ? 'S' : 'W';
    const formattedId = `${prefix}${this.elementId}`;
    return this.validateId(formattedId) ? formattedId : '';
  }

  // Typ-Unterscheidung verbessern
  getSelectedType(): string {
    // CONTROL_ELEMENT erlaubt beide Typen
    if (this.selectedCategory === ElementType.CONTROL_ELEMENT) {
      return this.selectedSignalType || this.selectedSwitchType;
    }
    return this.selectedSignalType;
  }

  isValid(): boolean {
    const formattedId = this.getFormattedId();
    if (!formattedId || this.isDuplicateId) {
      return false;
    }

    // Prüfe ob ein Typ ausgewählt wurde
    if (this.selectedCategory === ElementType.SWITCH) {
      return Boolean(this.selectedSwitchType);
    }
    if (this.selectedCategory === ElementType.SIGNAL) {
      return Boolean(this.selectedSignalType);
    }
    return false;
  }

  onAdd(): void {
    const formattedId = this.getFormattedId();
    if (!this.isValid() || !formattedId) return;
    
    if (this.selectedCategory === ElementType.SIGNAL) {
      this.saveSignal();
    } else {
      this.saveSwitch();
    }
  }

  getSignalIcon(): Type<any> {
    const selectedType = this.getSelectedType();
    
    if (this.selectedCategory === ElementType.SIGNAL) {
      switch(selectedType) {
        case 'blocksignal': return BlockSignalSymbolComponent;
        case 'einfahrsignal': return EntrySignalSymbolComponent;
        case 'ausfahrsignal': return ExitSignalSymbolComponent;
        default: return BlockSignalSymbolComponent;
      }
    } else if (this.selectedCategory === ElementType.SWITCH) {
      switch(selectedType) {
        case 'rechtsweiche': return RightSwitchSymbolComponent;
        case 'linksweiche': return LeftSwitchSymbolComponent;
        case 'doppelkreuzweiche': return DoubleCrossSwitchComponent;
        default: return RightSwitchSymbolComponent;
      }
    }
    return BlockSignalSymbolComponent;
  }

  onReset(): void {
    this.selectedCategory = ElementType.CONTROL_ELEMENT;
    this.selectedSignalType = '';
    this.selectedSwitchType = '';
    this.elementId = '';
    this.isDuplicateId = false;
    this.associatedSwitches = [];
  }
}

