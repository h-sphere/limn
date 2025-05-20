import { Point } from "../primitives/Point";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

type Color = string
type Size = number

export interface BPointConfig {
    color: Color
    width: Size
}

export class BPoint extends PrimitiveRenderable<Point, BPointConfig> {
    parseConfig(config: Partial<BPointConfig>): BPointConfig {
        return {
            color: config.color ?? 'black',
            width: config.width ?? 5
        }
    }
    render(ctx: BristleContext) {
        ctx.fillStyle = this._config.color
        ctx.beginPath()
        ctx.arc(this._p.x, this._p.y, this._config.width, 0, 2 * Math.PI)
        ctx.fill()
    }
}