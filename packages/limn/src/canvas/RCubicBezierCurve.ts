import { num, xy } from "../math/matrix";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RCurveConfig {
    width: Size;
    color: Color;
}

export class RCubicBezierCurve extends PrimitiveRenderable<CubicBezierCurve, RCurveConfig> {
    parseConfig(config: Partial<RCurveConfig>): RCurveConfig {
        return {
            color: config.color ?? 'red',
            width: config.width ?? 1
        }
    }

    render(ctx: LimnContext) {
        const config = this.config
        ctx.strokeStyle = color(config.color)
        ctx.lineWidth = num(config.width)
        ctx.beginPath()
        const p1 = xy(this._p.p1)
        const p2 = xy(this._p.p2)
        const c1 = xy(this._p.c1)
        ctx.moveTo(...p1)
        if (!this._p.c2) {
            ctx.quadraticCurveTo(...c1, ...p2)
        } else {
            const c2 = xy(this._p.c2)
            ctx.bezierCurveTo(...c1, ...c2, ...p2)
        }
        ctx.stroke()
    }
}