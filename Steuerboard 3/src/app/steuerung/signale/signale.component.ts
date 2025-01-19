import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { CreateCardService } from '../../services/create-card.service';

@Component({
  selector: 'app-signale',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './signale.component.html',
  styleUrls: ['./signale.component.css'],
  providers: [CreateCardService]
})
export class SignaleComponent implements OnInit {
  einfahrsignale: { id: string }[] = [];

  constructor(private createCardService: CreateCardService) {}

  ngOnInit() {
    interface Signal {
      type: string;
      id: string;
    }

    this.createCardService.signalCreated.subscribe((signal: Signal) => {
      if (signal.type === 'Eingangsignal') {
        this.einfahrsignale.push({ id: signal.id });
      }
    });
  }
}
