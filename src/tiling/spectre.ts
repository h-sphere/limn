import { LimnContext, Renderable } from "../canvas/interfaces";
import { Turtle, TurtleRenderConfig } from "../turtle/turtle";
interface Settings {
    x: number,
    y: number,
    size: number,
    rotation?: number
}

export class Spectre implements Renderable {
    constructor(private readonly params: Settings, private readonly config: TurtleRenderConfig) {

    }

    render (ctx: LimnContext) {
        ctx.beginPath()
        // FIXME: use turtle?
        const x = this.params.x
        const y = this.params.y
        const size = this.params.size
        ctx.beginPath()
        const t = new Turtle(x, y, ctx)
        if (this.params.rotation) {
            t.rotateBy(this.params.rotation)
        }
        t.lineForward(size)
        t.rotateBy(60)
        t.lineForward(size)
        t.rotateBy(-90)
        t.lineForward(size)
        t.rotateBy(-60)
        t.lineForward(size)
        t.rotateBy(90)
        t.lineForward(size)
        t.rotateBy(-60)
        t.lineForward(size)
        t.rotateBy(-90)
        t.lineForward(size)

        t.rotateBy(-60)
        t.lineForward(size)

        t.rotateBy(90)
        t.lineForward(size)

        t.rotateBy(-60)
        t.lineForward(size)
        t.lineForward(size)
        
        t.rotateBy(-60)
        t.lineForward(size)
        
        t.rotateBy(-90)
        t.lineForward(size)
        
        t.rotateBy(60)
        t.lineForward(size)
        
        t.render(this.config)

        return t.points
    }
}