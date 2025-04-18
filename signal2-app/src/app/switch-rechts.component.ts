import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-switch-rechts',
  standalone: true,
  template: `<svg width="200" height="100"></svg>`,
  styles: []
})
export class SwitchRechtsComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.drawSwitch();
  }

  private drawSwitch(): void {
    const svg = d3.select(this.el.nativeElement).select('svg');
     
    const startX = 25;
    const startY = 50;
    const length = 100;
    const angle = -15 * (Math.PI / 180); // 15° in Radiant
    const lineWidth = 6;

    // Endpunkte berechnen
    const endX = startX + length;
    const endY = startY;

    const branchX = startX + length / 2;
    const branchY = startY;
    const branchLength = length / 2;
    const branchEndX = branchX + Math.cos(angle) * branchLength;
    const branchEndY = branchY - Math.sin(angle) * branchLength;

    // Hauptlinie
    svg.append("line")
      .attr("x1", startX)
      .attr("y1", startY)
      .attr("x2", endX)
      .attr("y2", endY)
      .attr("stroke", "black")
      .attr("stroke-width", lineWidth);

    // Abzweigungslinie
    svg.append("line")
      .attr("x1", branchX)
      .attr("y1", branchY)
      .attr("x2", branchEndX)
      .attr("y2", branchEndY)
      .attr("stroke", "black")
      .attr("stroke-width", lineWidth);

    // Funktion zum Erstellen eines gelben Rechtecks, das einen optionalen Rotationsparameter akzeptiert.
    const createRectangle = (x: number, y: number, rotation: number = 0) => {
      svg.append("rect")
        .attr("x", x - 2)
        .attr("y", y - 2)
        .attr("width", 20)
        .attr("height", 4)
        .attr("fill", "yellow")
        .attr("stroke", "black")
        .attr("transform", `rotate(${rotation}, ${x}, ${y})`);
    };

    // Rechtecke platzieren
    createRectangle(startX + length / 4, startY); // Vor der Abzweigung
    createRectangle(endX - length / 4, startY);     // Nach der Abzweigung

    // Rechteck in der Abzweigung: 
    const midX = branchX + (branchEndX - branchX) / 2;
    const midY = branchY + (branchEndY - branchY) / 2;
    const rotationDeg = 15; // Rotation passend zur Abzweigung
    createRectangle(midX, midY, rotationDeg);
  }
}
