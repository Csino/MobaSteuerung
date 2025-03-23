import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SwitchService } from '../../services/switch.service';
import { LeftSwitchSymbolComponent } from '../image/leftswitch.component';
import { RightSwitchSymbolComponent } from '../image/rightswitch.component';
import { DoubleCrossSwitchComponent } from '../image/doublecrossswitch.component';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SwitchComponent implements OnInit {
  containers$;

  constructor(private readonly switchService: SwitchService) {
    this.containers$ = this.switchService.currentContainers;
  }

  ngOnInit(): void {}

  deleteSwitch(type: string, id: string): void {
    this.switchService.removeSwitch(type, id);
  }

  togglePosition(type: string, id: string): void {
    this.switchService.toggleSwitchPosition(type, id);
  }

  getSwitchComponent(type: string): any {
    switch(type) {
      case 'rechtsweiche': return RightSwitchSymbolComponent;
      case 'linksweiche': return LeftSwitchSymbolComponent;
      case 'doppelkreuzweiche': return DoubleCrossSwitchComponent;
      default: return null;
    }
  }
}
