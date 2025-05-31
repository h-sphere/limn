import { num, xy } from "../math/matrix";
import { BezierSpline } from "../primitives/BezierSpline";
import { LimnContext, PrimitiveRenderable } from "./interfaces";
import { Color, Size } from "../utils/configs";
import { color, str } from "../utils/signalTypes";

export interface RBezierSplineConfig {
    width: Size;
    color: Color;
}

export class RBezierSpline extends PrimitiveRenderable<BezierSpline, RBezierSplineConfig> {
    parseConfig(config: Partial<RBezierSplineConfig>): RBezierSplineConfig {
        return {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }
    render(ctx: LimnContext) {
        ctx.strokeStyle = color(this._config.color)
        ctx.lineWidth = num(this._config.width)
        ctx.beginPath()

        const points = this._p.points
        const pbegin = xy(points[0])

        ctx.moveTo(...pbegin)
        for (let i = 1; (i + 2) < points.length; i += 3) {
            const c1 = xy(points[i])
            const c2 = xy(points[i + 1])
            const p = xy(points[i + 2])
            ctx.bezierCurveTo(...c1, ...c2, ...p)
        }
        ctx.stroke()
    }
}