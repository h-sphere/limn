import { LimnContext } from "../canvas/interfaces"
import { Point } from "../primitives/Point";

export interface TurtleRenderConfig {
    width?: number;
    stroke?: string;
    fill?: string;
}

export class Turtle {
    angle: number = 0
    points: Array<Point> = []
    constructor(private x: number, private y: number, private ctx: LimnContext) {
        this.points.push(new Point(x, y))
        this.ctx.moveTo(x, y)
    }

    moveTo(x: number, y: number) {
        this.x = x
        this.y = y
        this.points.push(new Point(x, y))
        this.ctx.moveTo(x, y)
    }

    lineTo(x: number, y: number) {
        this.x = x
        this.y = y
        this.ctx.lineTo(this.x, this.y)
        this.points.push(new Point(x, y))
    }

    rotateBy(a: number) {
        this.angle += a
    }

    rotateTo(a: number) {
        this.angle = a
    }

    lineForward(n: number) {
        const newX = this.x + n * Math.cos(this.angle * Math.PI / 180)
        const newY = this.y + n * Math.sin(this.angle * Math.PI / 180)
        this.lineTo(newX, newY)

    }

    moveForward(n: number) {
        const newX = this.x + n * Math.cos(this.angle * Math.PI / 180)
        const newY = this.y + n * Math.sin(this.angle * Math.PI / 180)
        this.moveTo(newX, newY)
    }

    private draw() {

    }

    render(config: TurtleRenderConfig) {
        if (config.stroke) {
            this.ctx.strokeStyle = config.stroke
            this.ctx.lineWidth = config.width || 1
            this.ctx.stroke()
        }
        if (config.fill) {
            this.ctx.fillStyle = config.fill
            this.ctx.fill()
        }
    }
}