import { BristleContext, Renderable } from "../bristle/interfaces";
import { Point } from "../primitives/Point";
import { Rectangle } from "../primitives/Rectangle";

const multiply = (a: Point, b: Point) => {
    return new Point(
        a.x * b.x - a.y * b.y,
        a.x * b.y + a.y * b.x
    )
}

const inMandelbrotSet = (c: Point) => {
    let z = new Point(0, 0)
    let escapeRadius = 2 * 2
    for (let i = 0; i < 1000; i++) {
        z = multiply(z, z).add(c.x, c.y)
        if (z.x + z.y > escapeRadius) {
            return i
        }
    }
    return 1000
}

export class Mandelbrot implements Renderable {
    render(ctx: BristleContext): void {
        const { width, height } = ctx.canvas
        const size = Math.min(width, height)
        this.renderSection(new Rectangle(
            new Point(0, 0),
            new Point(size, size),
            0
        ), 10, size, ctx)
    }

    renderSection(r: Rectangle, d: number, size: number, ctx: BristleContext) {
        if (d <= 0) {
            return
        }

        const p = new Point(r.p1.x * 4 / size, r.p1.y * 4 / size - 1)

        const val = inMandelbrotSet(p)
        const perc = Math.floor(val / 100)
        ctx.fillStyle = `rgb(255 0 0 / ${perc}%`
        ctx.fillRect(...r.p1.xy, ...r.size.xy)
        // ctx.strokeRect(...r.p1.xy, ...r.size.xy)

        if (d > 0) {
            requestAnimationFrame(() => {
                const c = r.center
                const topPoint = r.p1.add(r.size.x / 2, 0)
                const topPart = new Rectangle(topPoint, topPoint.add(r.size.x / 2, r.size.y / 2), 0)
                this.renderSection(
                    topPart, d - 1, size, ctx
                )

                const bottomPoint = topPoint.add(0, r.size.y / 2)
                const bottomPart = new Rectangle(bottomPoint, bottomPoint.add(r.size.x / 2, r.size.y / 2), 0)
                this.renderSection(
                    bottomPart, d - 1, size, ctx
                )

                const leftPoint = r.p1.add(0, r.size.y / 2)
                const leftPart = new Rectangle(leftPoint, leftPoint.add(r.size.x / 2, r.size.y / 2), 0)
                this.renderSection(
                    leftPart, d - 1, size, ctx
                )
            }
            )
        }

        // compute mandelbrot value at point
    }

}