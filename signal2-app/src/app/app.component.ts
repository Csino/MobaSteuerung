import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchLinksComponent } from './switch-links.component';
import { SwitchRechtsComponent } from './switch-rechts.component';
import { SwitchDoublecrossComponent } from './switch-doublecross.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SwitchLinksComponent,
    SwitchRechtsComponent,
    SwitchDoublecrossComponent
  ],
  template: `
    <main>
      <h1>Weichen-Demo</h1>
      <div class="switches">
        <app-switch-links></app-switch-links>
        <app-switch-rechts></app-switch-rechts>
        <app-switch-doublecross></app-switch-doublecross>
      </div>
    </main>
  `,
  styles: [`
    .switches {
      display: flex;
      gap: 20px;
      margin: 20px;
    }
  `]
})
export class AppComponent {
  title = 'signal2-app';
}
