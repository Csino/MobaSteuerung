import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-doublecrossswitch-symbol',
  template: `<svg width="200" height="100"></svg>`,
  styles: []
})
export class DoubleCrossSwitchComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.drawSwitch();
  }

  private drawSwitch(): void {
    const svg = d3.select(this.el.nativeElement).select('svg');
    
    const startX = 25;
    const startY = 25;
    const length = 100;
    const angle = 15 * (Math.PI / 180); // 15 Grad in Radiant
    const lineWidth = 6;
    

    // Berechne die vertikale Verschiebung basierend auf dem Winkel
    const heightOffset = Math.tan(angle) * length;

    // Berechne Mittelpunkt der Kreuzung
    const centerX = startX + length / 2;
    const centerY = startY + heightOffset / 2;

    // Hauptlinien (Kreuzung)
    const pathData = [
      // Linie von oben links nach unten rechts
      `M ${startX} ${startY} L ${startX + length} ${startY + heightOffset}`,
      // Linie von oben rechts nach unten links
      `M ${startX + length} ${startY} L ${startX} ${startY + heightOffset}`
    ];

    // Zeichne die Kreuzungslinien
    pathData.forEach(d => {
      svg.append('path')
        .attr('d', d)
        .attr('stroke', 'black')
        .attr('stroke-width', lineWidth)
        .attr('fill', 'none');
    });

    // Füge horizontale Markierungsstriche hinzu
    const markerWidth = 6; // Länge der Markierungsstriche (halbe Gesamtlänge)

    svg.append('line')
      .attr('x1', centerX - markerWidth)  // Länge anpassbar über markerWidth
      .attr('y1', centerY - 8)
      .attr('x2', centerX + markerWidth)
      .attr('y2', centerY - 8)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    svg.append('line')
      .attr('x1', centerX - markerWidth)
      .attr('y1', centerY + 8)
      .attr('x2', centerX + markerWidth)
      .attr('y2', centerY + 8)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    // Funktion zum Erstellen eines gelben Rechtecks
    const createRectangle = (x: number, y: number, rotation: number) => {
      svg.append("rect")
        .attr("x", x - 2)
        .attr("y", y - 2)
        .attr("width", 20)
        .attr("height", 4)
        .attr("fill", "yellow")
        .attr("stroke", "black")
        .attr("transform", `rotate(${rotation}, ${x}, ${y})`);
    };

    // Platziere vier Rechtecke an den Weichenpositionen
    // Links oben
    createRectangle(startX + length * 0.10, startY + heightOffset * 0.10, 15);
    // Rechts oben
    createRectangle(startX + length * 0.75, startY + heightOffset * 0.25, -15);
    // Links unten
    createRectangle(startX + length * 0.10, startY + heightOffset * 0.90, -15);
    // Rechts unten
    createRectangle(startX + length * 0.75, startY + heightOffset * 0.75, 15);
  }
}

