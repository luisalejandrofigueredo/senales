import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import {  ConnectionObject, LineObject, NgGdService, NodeObject, Point, ShapeObject} from "ng-gd";
@Component({
  selector: 'app-ng-gd-component',
  imports: [],
  providers: [NgGdService],
  templateUrl: './ng-gd-component.component.html',
  styleUrl: './ng-gd-component.component.scss'
})
export class NgGdComponentComponent implements OnInit {
  gd = inject(NgGdService);
  private ctx!: CanvasRenderingContext2D;
  move = false;
  drag = false;
  dragStartPosition: Point = { x: 0, y: 0 };
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

 ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = 'black';
    this.gd.clearObjects();
    
    this.gd.start(
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.gd.clear(this.ctx);
    this.gd.setDarkMode();
    const point: Point = { x: 50, y: 20 };
    this.gd.addLabel(point, 'GD Label sample', 20, 0, true);
    this.gd.addLabel({ x: 280, y: 280 }, 'GD Label Rotate sample', 20, 270);
    this.gd.addNode({ x: 100, y: 100 }, 'Node sample', '', true);
    this.gd.addConnection({ x: 290, y: 250 }, { x: 50, y: 250 }, '#ff0000');
    this.gd.addRectangle(
      { x: 150, y: 170 },
      50,
      50,
      10,
      '#0000ff',
      '#ff0000',
      true
    );
    this.gd.addCircle({ x: 80, y: 80 }, 10, '#00ff00', '#ff0000');
    this.gd.addLine({ x: 50, y: 230 }, { x: 200, y: 230 }, 4);
    this.gd.addTriangle(
      { x: 150, y: 150 },
      { x: 170, y: 150 },
      { x: 120, y: 120 },
      '#00ff00',
      '#0000ff'
    );
    const multsides = this.gd.addMultiplesSides(
      { x: 180, y: 180 },
      6,
      20,
      '#0000ff'
    );
    multsides.x = 175;
    const connect = this.gd.castingConnection(4);
    connect.Name = 'Connection';
    connect.MirrorLabel = true;
    connect.Visible = true;
    connect.align = 50;
    connect.distance = -5;
    connect.color = '#FF0000';
    //Other way to get a object
    console.log('Objects:', this.gd.canvasObjects);
    let nodeByName=this.gd.findByName('Node sample');
    let node: NodeObject = this.gd.casting(3) as NodeObject;
    console.log('Node:', node,nodeByName);
    node.angleLabel=0;
    node.distanceLabel = 10;
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

  @HostListener('mousedown', ['$event'])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0) {
      this.move = true;
    } else {
      this.drag = true;
      this.drag = true;
      this.dragStartPosition = this.gd.getMousePoint(
        this.ctx,
        event.offsetX,
        event.offsetY
      );
    }
  }

  @HostListener('mousemove', ['$event'])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (
          !(element.shape instanceof ConnectionObject) &&
          !(element.shape instanceof LineObject)
        ) {
          this.gd.clear(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          this.gd.draw(this.ctx);
        } else {
          if (element.action === 'inPointXY') {
            this.gd.clear(this.ctx);
            (element.shape as ConnectionObject).moveMouseXY(this.ctx, event);
            this.gd.draw(this.ctx);
          }
          if (element.action === 'inPointToXY') {
            this.gd.clear(this.ctx);
            (element.shape as ConnectionObject).moveMouseToXY(this.ctx, event);
            this.gd.draw(this.ctx);
          }
          if (element.action === 'inRectangle') {
            this.gd.clear(this.ctx);
            (element.shape as ConnectionObject).moveMouse(this.ctx, event);
            this.gd.draw(this.ctx);
          }
        }
      });
    }
    if (this.drag === true) {
      const currentTransformedCursor = this.gd.getMousePoint(
        this.ctx,
        event.offsetX,
        event.offsetY
      );
      this.ctx.translate(
        currentTransformedCursor.x - this.dragStartPosition.x,
        currentTransformedCursor.y - this.dragStartPosition.y
      );
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
    }
  }

  @HostListener('mouseup', ['$event'])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true || this.drag === true) {
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
      this.gd.resetMouse();
      this.move = false;
      this.drag = false;
    }
  }

  @HostListener('mousewheel', ['$event'])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const mouse = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.gd.zoomInPoint(this.ctx, mouse.x, mouse.y, zoom);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

}

