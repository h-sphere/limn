import { num } from "../math/matrix";
import { Circle } from "../primitives/Circle";
import { Color, Size } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

export interface BCircleConfig {
    width: Size
    fillStyle: Color
    strokeStyle: Color

}

export class BCircle extends PrimitiveRenderable<Circle, BCircleConfig> {
    parseConfig(config: Partial<BCircleConfig>): BCircleConfig {
        return {
            fillStyle: config.fillStyle ?? '',
            strokeStyle: config.strokeStyle ?? '',
            width: config.width ?? 1
        }
    }
    render(ctx: BristleContext) {
        const center = this._p.center
        const radius = this._p.radius
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
        if (this._config.fillStyle) {
            ctx.fillStyle = str(this._config.fillStyle)
            ctx.fill()
        }
        if (this._config.strokeStyle) {
            ctx.strokeStyle = str(this._config.strokeStyle)
            ctx.lineWidth = num(this._config.width)
            ctx.stroke()
        }
    }
}