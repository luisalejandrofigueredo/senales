import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NgGdService, Point, LineObject, Candlestick } from 'ng-gd';
@Component({
  selector: 'app-candle-chart',
  imports: [],
  providers: [NgGdService],
  templateUrl: './candle-chart.component.html',
  styleUrl: './candle-chart.component.scss'
})
export class CandleChartComponent implements OnInit {
  name = 'Angular';
  move = false;
  chart: number = 0;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  gd = inject(NgGdService);
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.gd.start(800, 600);
    this.gd.setDarkMode();
    const candleStick: Candlestick[] = [
      { timestamp: 1621244400000, open: 100, high: 150, low: 80, close: 120 },
      { timestamp: 1621330800000, open: 120, high: 180, low: 100, close: 150 },
      { timestamp: 1621417200000, open: 150, high: 200, low: 50, close: 100 },
      { timestamp: 1621849200000, open: 260, high: 300, low: 200, close: 200 },
      { timestamp: 1621935600000, open: 280, high: 320, low: 260, close: 300 },
      { timestamp: 1621503600000, open: 180, high: 220, low: 150, close: 200 },
      { timestamp: 1621676400000, open: 220, high: 260, low: 200, close: 240 },
      { timestamp: 1621762800000, open: 240, high: 280, low: 50, close: 100 },
      { timestamp: 1622022000000, open: 300, high: 340, low: 280, close: 320 },
      { timestamp: 1621590000000, open: 200, high: 240, low: 180, close: 220 },
    ];
    this.gd.addCandleChart(
      { x: 50, y: 300 },
      candleStick,
      30,
      600,
      '#ff0000',
      '#00ff00',
      60,
      true
    );

    const adjustLabelX: Point[] = [
      { x: 10, y: 0 },
      { x: 12, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ];
    this.gd.addAxisX(
      this.ctx,
      { x: 25, y: 300 },
      600,
      10,
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Sept',
        'October',
      ],
      12,
      0,
      10,
      adjustLabelX
    );
    const adjustLabelY: Point[] = [
      { x: 0, y: 0 },
      { x: 0, y: -15 },
      { x: 0, y: -15 },
      { x: 0, y: -15 },
    ];
    this.gd.addAxisY(
      this.ctx,
      { x: 25, y: 300 },
      300,
      3,
      ['0', '100', '200', '300'],
      12,
      0,
      10,
      adjustLabelY
    );
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
    
  }

  @HostListener('mouseup', ['$event'])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true) {
      this.gd.resetMouse();
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
      this.move = false;
    }
  }

  @HostListener('mousedown', ['$event'])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0) {
      this.move = true;
    }
  }

  @HostListener('mousemove', ['$event'])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (!(element.shape instanceof LineObject)) {
          this.gd.clear(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          this.gd.draw(this.ctx);
        } else {
          if (element.action === 'inPointXY') {
            this.gd.clear(this.ctx);
            (element.shape as LineObject).moveMouseXY(this.ctx, event);
            this.gd.draw(this.ctx);
          }
          if (element.action === 'inPointToXY') {
            this.gd.clear(this.ctx);
            (element.shape as LineObject).moveMouseToXY(this.ctx, event);
            this.gd.draw(this.ctx);
          }
          if (element.action === 'inRectangle') {
            this.gd.clear(this.ctx);
            (element.shape as LineObject).moveMouse(this.ctx, event);
            this.gd.draw(this.ctx);
          }
        }
      });
    }
  }

}
