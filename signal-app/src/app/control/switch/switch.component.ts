import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SwitchService } from '../../services/switch.service';

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

  getSwitchComponent(type: string): any {
    // TODO: Implementieren Sie hier die Komponenten-Logik für verschiedene Weichentypen
    return null;
  }
}
