import { Component, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { BlockSignalSymbolComponent } from '../image/blocksignalsymbol';
import { EntrySignalSymbolComponent } from '../image/entrysignalsymbol';
import { ExitSignalSymbolComponent } from '../image/exitsignalsymbol';

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
    
],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  selectedSignalType: string = '';
  signalId: string = '';

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
}
