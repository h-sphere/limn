import { num } from "../math/matrix";
import { Point } from "../primitives/Point";
import { Color, Size } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

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
        ctx.fillStyle = str(this._config.color)
        ctx.beginPath()
        ctx.arc(this._p.x, this._p.y, num(this._config.width), 0, 2 * Math.PI)
        ctx.fill()
    }
}