import { computed, Signal } from "signia";
import { xy } from "../math/matrix";
import { BezierSpline } from "../primitives/BezierSpline";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

export interface BBezierSplineConfig {
    width: number;
    color: string;
}

export class BBezierSpline extends PrimitiveRenderable<BezierSpline, BBezierSplineConfig> {
    parseConfig(config: Partial<BBezierSplineConfig>): BBezierSplineConfig {
        return {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }
    render(ctx: BristleContext) {
        ctx.strokeStyle = this._config.color
        ctx.lineWidth = this._config.width
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