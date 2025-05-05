import { transform, TransformConfig, transformPoint } from "../math/matrix";
import { Point } from "../primitives/Point";
import { Transformable } from "../utils/transformable";
import { BristleContext, Renderable } from "./interfaces";

type Color = string
type Size = number

interface BPointConfig {
    color: Color
    width: Size
}

export class BPoint extends Point implements Renderable {
    #config: BPointConfig
    constructor(point: Point, config?: Partial<BPointConfig>) {
        super(point.xSignal, point.ySignal)
        this.#config = {
            color: config?.color ?? 'black',
            width: config?.width ?? 5
        }
    }
    render(ctx: BristleContext) {
        ctx.fillStyle = this.#config.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.#config.width, 0, 2 * Math.PI)
        ctx.fill()
    }

    static from(p: Point, config?: Partial<BPointConfig>) {
        return new BPoint(p, config)
    }
}