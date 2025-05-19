import { computed, Signal } from "signia";
import { xy } from "../math/matrix";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";
import { BristleContext, Renderable } from "./interfaces";

interface BCurveConfig {
    width: number;
    color: string;
}

export class BCubicBezierCurve extends CubicBezierCurve implements Renderable {
    #config: BCurveConfig
    constructor(c: CubicBezierCurve, config?: Partial<BCurveConfig>) {
        super(c.p1, c.p2, c.c1, c.c2)
        this.#config = {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }
    get state(): Signal<any, unknown> {
        return computed('BCurveConfig.state', () => ({
            p1: this.p1,
            p2: this.p2,
            c1: this.c1,
            c2: this.c2,
            config: this.#config
        }))
    }

    render(ctx: BristleContext) {
        ctx.strokeStyle = this.#config.color
        ctx.lineWidth = this.#config.width
        ctx.beginPath()
        const p1 = xy(this.p1)
        const p2 = xy(this.p2)
        const c1 = xy(this.c1)
        ctx.moveTo(...p1)
        if (!this.c2) {
            ctx.quadraticCurveTo(...c1, ...p2)
        } else {
            const c2 = xy(this.c2)
            ctx.bezierCurveTo(...c1, ...c2, ...p2)
        }
        ctx.stroke()
    }

    static from(c: CubicBezierCurve, config?: Partial<BCurveConfig>) {
        return new BCubicBezierCurve(c, config)
    }
}