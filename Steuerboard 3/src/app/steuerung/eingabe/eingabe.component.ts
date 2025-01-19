import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { CreateCardService } from '../../services/create-card.service';
import { ISignal } from '../../interfaces/signal.interfaces';


@Component({
  selector: 'app-eingabe',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  providers: [CreateCardService],
  templateUrl: './eingabe.component.html',
  styleUrl: './eingabe.component.scss'
})
export class EingabeComponent {
  @Input() signal!: ISignal;

  constructor(private createCardService: CreateCardService) {}

  onAspektClick(aspekt: string): void {
    this.createCardService.setSignalStatus(Number(this.signal.id), aspekt);
  }
}
