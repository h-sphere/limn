import { Line } from "../primitives/Line";
import { LimnContext, PrimitiveRenderable } from "./interfaces";
import { Color, Size } from "../utils/configs";
import { num } from "../math/matrix";
import { color } from "../utils/signalTypes";

export interface RLineConfig {
    width: Size;
    color: Color;
}

export class RLine extends PrimitiveRenderable<Line, RLineConfig> {
    parseConfig(config: Partial<RLineConfig>): RLineConfig {
        return {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }

    render(ctx: LimnContext) {
        const config = this.config
        ctx.strokeStyle = color(config.color)
        ctx.lineWidth = num(config.width)
        ctx.beginPath()
        ctx.moveTo(this._p.p1.x, this._p.p1.y)
        ctx.lineTo(this._p.p2.x, this._p.p2.y)
        ctx.stroke()
    }
}