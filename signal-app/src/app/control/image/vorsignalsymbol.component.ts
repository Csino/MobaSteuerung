import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-vorsignalsymbol',
  template: `
    <svg [attr.width]="width" [attr.height]="height">
      <path
        [attr.d]="vorsignalSymbol()"
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
export class VorsignalSymbolComponent implements OnInit {
  @Input() width = 40;
  @Input() height = 60;
  @Input() radius = 5;
  @Input() fill = 'black';
  @Input() signalData!: { id: string; state?: 'halt' | 'fahrt'; type?: string };

  get signalState(): 'halt' | 'fahrt' {
    return this.signalData?.state || 'halt';
  }

  circleRadius = 4;
  circles: Array<{ cx: number; cy: number; fill: string }> = [];

  ngOnInit() {
    this.initializeCircles();
    console.log('Vorsignal initialisiert mit Breite:', this.width, 'Höhe:', this.height);
  }

  private initializeCircles() {
    this.circles = [
      { cx: this.circleRadius * 2, cy: this.height / 3, fill: 'yellow' }, // Oben links
      { cx: this.width - (this.circleRadius * 2), cy: this.height / 3, fill: 'green' }, // Oben rechts
      { cx: this.circleRadius * 2, cy: this.height / 1.5, fill: 'yellow' }, // Unten links
      { cx: this.width - (this.circleRadius * 2), cy: this.height / 1.5, fill: 'green' } // Unten rechts
    ];
  }

  vorsignalSymbol(): string {
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
      case 'yellow':
        signalAspect = 'Vr0'; // Halt erwarten
        break;
      case 'green':
        signalAspect = 'Vr1'; // Fahrt erwarten
        break;
    }
    console.log('Vorsignal zeigt:', signalAspect);
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