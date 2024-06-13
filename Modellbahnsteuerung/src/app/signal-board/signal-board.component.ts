import { Component } from '@angular/core';

@Component({
  selector: 'app-signal-board',
  standalone: true,
  imports: [],
  templateUrl: './signal-board.component.html',
  styleUrl: './signal-board.component.scss',
  providers: [SignalService]
})

class SignalBoardComponent {
  constructor(private service: SignalService) {}
}
