import { computed, Signal } from "signia";
import { xy } from "../math/matrix";
import { BezierSpline } from "../primitives/BezierSpline";
import { BristleContext, Renderable } from "./interfaces";

interface BBezierSplineConfig {
    width: number;
    color: string;
}

export class BBezierSpline extends BezierSpline implements Renderable {
    #config: BBezierSplineConfig
    constructor(s: BezierSpline, config?: Partial<BBezierSplineConfig>) {
        super(s.points)
        this.#config = {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }
    get state(): Signal<any, unknown> {
        return computed('BBezierSpline.state', () => ({
            points: this.points,
            config: this.#config
        }))
    }

    render(ctx: BristleContext) {
        ctx.strokeStyle = this.#config.color
        ctx.lineWidth = this.#config.width
        ctx.beginPath()
        
        const points = this.points
        const pbegin = xy(points[0])

        ctx.moveTo(...pbegin)
        for (let i=1;(i+2)<points.length;i+=3) {
            const c1 = xy(points[i])
            const c2 = xy(points[i+1])
            const p = xy(points[i+2])
            ctx.bezierCurveTo(...c1, ...c2, ...p)
        }
        ctx.stroke()
    }

    static from(s: BezierSpline, config?: Partial<BBezierSplineConfig>) {
        return new BBezierSpline(s, config)
    }
}