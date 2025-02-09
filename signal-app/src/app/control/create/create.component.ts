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
import { ControlCreateService } from '../../services/control-create.service';

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
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  constructor(private controlCreateService: ControlCreateService) { }

  selectedSignalType: string = '';
  signalId: string = '';

  onSignalIdChange() {
    if (this.selectedSignalType && this.signalId) {
      this.sendSignalData({
        type: this.selectedSignalType,
        id: this.signalId
      });
    }
  }

  onSignalTypeChange() {
    if (this.selectedSignalType && this.signalId) {
      this.sendSignalData({
        type: this.selectedSignalType,
        id: this.signalId
      });
    }
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
    if (this.selectedSignalType && this.signalId) {
      this.controlCreateService.removeSignal(this.selectedSignalType, this.signalId);
    }
    this.selectedSignalType = '';
    this.signalId = '';
    this.sendSignalData({
      type: '',
      id: ''
    });
  }

  sendSignalData(data: any) {
    this.controlCreateService.updateSignalData(data);
  }
}
