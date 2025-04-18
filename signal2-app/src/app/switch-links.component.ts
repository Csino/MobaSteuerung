import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-switch-links',
  standalone: true,
  template: `<svg width="200" height="100"></svg>`,
  styles: []
})
export class SwitchLinksComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.drawSwitch();
  }

  private drawSwitch(): void {
    const svg = d3.select(this.el.nativeElement).select('svg');

    const startX = 25;
    const startY = 50;
    const length = 100;
    // Für Abzweigung nach rechts: Drehe die Linie um 15° (positiv = nach rechts)
    const angle = 15 * (Math.PI / 180);
    const lineWidth = 6;

    // Endpunkte der Hauptlinie
    const endX = startX + length;
    const endY = startY;

    // Abzweigung: Beginnt in der Mitte der Hauptlinie
    const branchX = startX + length / 2;
    const branchY = startY;
    const branchLength = length / 2;
    // Berechne Endpunkt der Abzweigung (nach rechts)
    const branchEndX = branchX + Math.cos(angle) * branchLength;
    const branchEndY = branchY - Math.sin(angle) * branchLength;

    // Zeichne Hauptlinie
    svg.append("line")
      .attr("x1", startX)
      .attr("y1", startY)
      .attr("x2", endX)
      .attr("y2", endY)
      .attr("stroke", "black")
      .attr("stroke-width", lineWidth);

    // Zeichne Abzweigungslinie
    svg.append("line")
      .attr("x1", branchX)
      .attr("y1", branchY)
      .attr("x2", branchEndX)
      .attr("y2", branchEndY)
      .attr("stroke", "black")
      .attr("stroke-width", lineWidth);

    // Funktion zum Erstellen eines gelben Rechtecks mit optionaler Rotation
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

    // Platziere Rechtecke in der Hauptlinie
    createRectangle(startX + length / 4, startY); // Vor der Abzweigung
    createRectangle(endX - length / 4, startY);     // Nach der Abzweigung

    // Rechteck in der Abzweigung:
    // Berechne die Mitte der Abzweigungslinie
    const midX = branchX + (branchEndX - branchX) / 2;
    const midY = branchY + (branchEndY - branchY) / 2;
    // Bei einer Abzweigung nach rechts (15°) soll das Rechteck nach links ausgerichtet sein.
    // Daher drehen wir das Rechteck um -15°.
    const rectangleRotation = -15;
    createRectangle(midX, midY, rectangleRotation);
  }
}
