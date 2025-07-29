import { num } from "../math/matrix";
import { Circle } from "../primitives/Circle";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
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
        const config = this.config
        if (config.fill) {
            ctx.fillStyle = color(config.fill)
            ctx.fill()
        }
        if (config.stroke) {
            ctx.strokeStyle = color(config.stroke)
            ctx.lineWidth = num(config.width)
            ctx.stroke()
        }
    }
}