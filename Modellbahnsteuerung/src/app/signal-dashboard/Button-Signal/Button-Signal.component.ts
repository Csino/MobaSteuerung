import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-signal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Button-Signal.component.html',
  styleUrl: './Button-Signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSignalComponent { }
