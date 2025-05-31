import { num } from "../math/matrix";
import { Circle } from "../primitives/Circle";
import { Color, Size } from "../utils/configs";
import { color, str } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RCircleConfig {
    width: Size
    fill: Color
    stroke: Color

}

export class RCircle extends PrimitiveRenderable<Circle, RCircleConfig> {
    parseConfig(config: Partial<RCircleConfig>): RCircleConfig {
        return {
            fill: config.fill ?? '',
            stroke: config.stroke ?? '',
            width: config.width ?? 1
        }
    }
    render(ctx: LimnContext) {
        const center = this._p.center
        const radius = this._p.radius
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
        if (this._config.fill) {
            ctx.fillStyle = color(this._config.fill)
            ctx.fill()
        }
        if (this._config.stroke) {
            ctx.strokeStyle = color(this._config.stroke)
            ctx.lineWidth = num(this._config.width)
            ctx.stroke()
        }
    }
}