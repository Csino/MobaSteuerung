import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-blocksignal-symbol',
  template: `
    <svg [attr.width]="width" [attr.height]="height">
      <path
        [attr.d]="blockSignalSymbol()"
        [attr.fill]="fill"
        stroke="black"
        stroke-width="1"
      />
      <circle
        *ngFor="let circle of circles"
        [attr.cx]="circle.cx"
        [attr.cy]="circle.cy"
        [attr.r]="circleRadius"
        [attr.fill]="circle.fill"
        (click)="onCircleClick(circle)"
        (mouseover)="onCircleMouseOver($event)"
        (mouseout)="onCircleMouseOut($event)"
      />
    </svg>
  `
})
export class BlockSignalSymbolComponent {
  @Input() width = 20;
  @Input() height = 45;
  @Input() radius = 5;
  @Input() fill = 'black';

  circleRadius = 3;
  circles = [
    { cx: this.circleRadius * 1.6, cy: this.height / 1.5, fill: 'red' }, // links mittig unten
    { cx: this.width - (this.circleRadius * 1.6), cy: this.height / 1.5, fill: 'green' }, // Etwas weiter links
  ];

  blockSignalSymbol(): string {
    const path = d3.path();
    
    path.moveTo(0, this.height);
    path.lineTo(0, this.radius);
    path.arcTo(0, 0, this.radius, 0, this.radius);
    path.lineTo(this.width - this.radius, 0);
    path.arcTo(this.width, 0, this.width, this.radius, this.radius);
    path.lineTo(this.width, this.height - this.radius);
    path.arcTo(this.width, this.height, this.width - this.radius, this.height, this.radius);
    path.lineTo(0, this.height);
    path.closePath();
    
    return path.toString();
  }

  onCircleClick(circle: { cx: number, cy: number, fill: string }): void {
    let signalAspect;
    switch (circle.fill) {
      case 'red':
        signalAspect = 'Hp0';
        break;
      case 'green':
        signalAspect = 'Hp1';
        break;      
    }
    console.log('Signal zeigt:', signalAspect);  
  }

  onCircleMouseOver(event: MouseEvent): void {
    const target = event.target as SVGCircleElement;
    target.setAttribute('r', (this.circleRadius * 1.5).toString());
  }

  onCircleMouseOut(event: MouseEvent): void {
    const target = event.target as SVGCircleElement;
    target.setAttribute('r', this.circleRadius.toString());
  }
}