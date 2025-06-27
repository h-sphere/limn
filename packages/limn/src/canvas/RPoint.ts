import { num } from "../math/matrix";
import { Point } from "../primitives/Point";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RPointConfig {
    color: Color
    radius: Size
}

export class RPoint extends PrimitiveRenderable<Point, RPointConfig> {
    parseConfig(config: Partial<RPointConfig>): RPointConfig {
        return {
            color: config.color ?? 'black',
            radius: config.radius ?? 5
        }
    }
    render(ctx: LimnContext) {
        ctx.fillStyle = color(this._config.color)
        ctx.beginPath()
        ctx.arc(this._p.x, this._p.y, num(this._config.radius), 0, 2 * Math.PI)
        ctx.fill()
    }
}