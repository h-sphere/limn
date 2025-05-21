import { Line } from "../primitives/Line";
import { BristleContext, PrimitiveRenderable } from "./interfaces";
import { Color, Size } from "../utils/configs";
import { num } from "../math/matrix";
import { str } from "../utils/signalTypes";

export interface BLineConfig {
    width: Size;
    color: Color;
}

export class BLine extends PrimitiveRenderable<Line, BLineConfig> {
    parseConfig(config: Partial<BLineConfig>): BLineConfig {
        return {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }

    render(ctx: BristleContext) {
        ctx.strokeStyle = str(this._config.color)
        ctx.lineWidth = num(this._config.width)
        ctx.beginPath()
        ctx.moveTo(this._p.p1.x, this._p.p1.y)
        ctx.lineTo(this._p.p2.x, this._p.p2.y)
        ctx.stroke()
    }
}