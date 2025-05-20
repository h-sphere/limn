import { num } from "../math/matrix";
import { Polygon } from "../primitives/Polygon";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

export interface BPolygonConfig {
    width: number;
    fillStyle: string;
    strokeStyle: string;
}

export class BPolygon extends PrimitiveRenderable<Polygon, BPolygonConfig> {
    parseConfig(config: Partial<BPolygonConfig>): BPolygonConfig {
        return {
            width: config?.width ?? 1,
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? '',

        }
    }

    render(ctx: BristleContext) {
        ctx.save()
        ctx.beginPath()
        const p = this._p.points
        for (let i=0;i<num(this._p.n);i++) {
            const point = p.get(i)
            ctx.lineTo(...point.xy)
        }
        ctx.lineTo(...p.get(0).xy)
        if (this._config.fillStyle) {
            ctx.fillStyle = this._config.fillStyle
            ctx.fill()
        }
        if (this._config.strokeStyle) {
            ctx.strokeStyle = this._config.strokeStyle
            ctx.lineWidth = this._config.width
            ctx.stroke()
        }
        ctx.restore()
    }
}