import { BristleContext, Renderable } from "../bristle/interfaces";

interface TriangleGridConfig {
    width: number,
    color: string
}

export class TriangleGrid implements Renderable {
    constructor(public readonly size: number, private readonly config: TriangleGridConfig) {

    }
    render(ctx: BristleContext) {
        // FIXME: probably shifts should be implemented here.
        const { width, height } = ctx.canvas
        ctx.beginPath()
        const h = this.size
        // FIXME: we can probably start better starting point
        for(let i=0;i<width;i+=h) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i + height * Math.cos(60 * Math.PI / 180), height)
        }
        for(let i=0;i>-width;i-=h) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i + height * Math.cos(60 * Math.PI / 180), height)
        }
        for(let i=0;i<2*width;i+=h) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i - width * Math.cos(60 * Math.PI / 180), height)
        }
        for(let i=0;i<width;i+=h) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i, height)

        }
        // for(let i=0;i<height;i+=this.size) {
        //     ctx.moveTo(0, i)
        //     ctx.lineTo(width, i)
        // }
        ctx.strokeStyle = this.config.color
        ctx.lineWidth = this.config.width
        ctx.stroke()
    }
}