import { num } from "../math/matrix";
import { Rectangle } from "../primitives/Rectangle";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RRectangleConfig {
    fill: Color
    stroke: Color
    width: Size
}

export class RRectangle extends PrimitiveRenderable<Rectangle, RRectangleConfig> {
    parseConfig(config: Partial<RRectangleConfig>): RRectangleConfig {
        return {
            fill: config?.fill ?? '',
            stroke: config?.stroke ?? '',
            width: config?.width ?? 1
        }
    }

    render(ctx: LimnContext) {
        ctx.beginPath()
        const config = this.config
        if (config.fill) {
            ctx.fillStyle = color(config.fill)
            ctx.fillRect(...this._p.p1.xy, ...this._p.size.xy)
        }

        if (config.stroke) {
            ctx.strokeStyle = color(config.stroke)
            ctx.lineWidth = num(config.width)
            ctx.strokeRect(...this._p.p1.xy, ...this._p.size.xy)
        }
    }
}