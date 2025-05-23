import { num, xy } from "../math/matrix";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";
import { Color, Size } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface BCurveConfig {
    width: Size;
    color: Color;
}

export class BCubicBezierCurve extends PrimitiveRenderable<CubicBezierCurve, BCurveConfig> {
    parseConfig(config: Partial<BCurveConfig>): BCurveConfig {
        return {
            color: config.color ?? 'red',
            width: config.width ?? 1
        }
    }

    render(ctx: LimnContext) {
        ctx.strokeStyle = str(this._config.color)
        ctx.lineWidth = num(this._config.width)
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