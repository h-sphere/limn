import { Line } from "../primitives/Line";
import { LimnContext, PrimitiveRenderable } from "./interfaces";
import { Color, Size } from "../utils/configs";
import { num } from "../math/matrix";
import { str } from "../utils/signalTypes";

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
        ctx.strokeStyle = str(this._config.color)
        ctx.lineWidth = num(this._config.width)
        ctx.beginPath()
        ctx.moveTo(this._p.p1.x, this._p.p1.y)
        ctx.lineTo(this._p.p2.x, this._p.p2.y)
        ctx.stroke()
    }
}