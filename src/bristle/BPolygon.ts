import { computed, Signal } from "signia";
import { num } from "../math/matrix";
import { Polygon } from "../primitives/Polygon";
import { BristleContext, Renderable } from "./interfaces";

interface BPolygonConfig {
    width: number;
    fillStyle: string;
    strokeStyle: string;
}

export class BPolygon extends Polygon implements Renderable {
    #config: BPolygonConfig
    constructor(p: Polygon, config?: Partial<BPolygonConfig>) {
        super(p.center, p.n, p.radius, p.angle)
        this.#config = {
            width: config?.width ?? 1,
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? '',

        }
    }
    get state(): Signal<any, unknown> {
        return computed('BPolygon.state', () => ({
            center: this.center,
            n: this.n,
            radius: this.radius,
            angle: this.angle,
            config: this.#config
        }))
    }

    render(ctx: BristleContext) {
        ctx.save()
        ctx.beginPath()
        const p = this.points
        for (let i=0;i<num(this.n);i++) {
            const point = p.get(i)
            ctx.lineTo(...point.xy)
        }
        ctx.lineTo(...p.get(0).xy)
        if (this.#config.fillStyle) {
            ctx.fillStyle = this.#config.fillStyle
            ctx.fill()
        }
        if (this.#config.strokeStyle) {
            ctx.strokeStyle = this.#config.strokeStyle
            ctx.lineWidth = this.#config.width
            ctx.stroke()
        }
        ctx.restore()
    }

    static from(p: Polygon, config?: Partial<BPolygonConfig>) {
        return new BPolygon(p, config)
    }
}