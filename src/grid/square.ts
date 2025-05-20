import { BristleContext, PrimitiveRenderable } from "../bristle/interfaces";

interface SquareGridConfig {
    width: number,
    color: string
}

export class SquareGrid implements PrimitiveRenderable {
    constructor(public readonly size: number, private readonly config: SquareGridConfig) {

    }
    render(ctx: BristleContext) {
        // FIXME: probably shifts should be implemented here.
        const { width, height } = ctx.canvas
        ctx.beginPath()
        for(let i=0;i<width;i+=this.size) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i, height)
        }
        for(let i=0;i<height;i+=this.size) {
            ctx.moveTo(0, i)
            ctx.lineTo(width, i)
        }
        ctx.strokeStyle = this.config.color
        ctx.lineWidth = this.config.width
        ctx.stroke()
    }
}