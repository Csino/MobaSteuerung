import { Component } from '@angular/core';

@Component({
  selector: 'app-doublecrossswitch',
  standalone: true,
  template: `
    <svg width="50" height="50" viewBox="0 0 50 50">
      <path d="M10 15 L40 35" stroke="black" stroke-width="2"/>
      <path d="M10 35 L40 15" stroke="black" stroke-width="2"/>
    </svg>
  `
})
export class DoubleCrossSwitchComponent {}
