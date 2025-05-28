import { num } from "../math/matrix";
import { Polygon } from "../primitives/Polygon";
import { Color, Size } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface BPolygonConfig {
    width: Size;
    fill: Color;
    stroke: Color;
}

export class BPolygon extends PrimitiveRenderable<Polygon, BPolygonConfig> {
    parseConfig(config: Partial<BPolygonConfig>): BPolygonConfig {
        return {
            width: config?.width ?? 1,
            fill: config?.fill ?? '',
            stroke: config?.stroke ?? '',

        }
    }

    render(ctx: LimnContext) {
        ctx.save()
        ctx.beginPath()
        const p = this._p.points
        for (let i=0;i<num(this._p.n);i++) {
            const point = p.get(i)
            ctx.lineTo(...point.xy)
        }
        ctx.lineTo(...p.get(0).xy)
        if (this._config.fill) {
            ctx.fillStyle = str(this._config.fill)
            ctx.fill()
        }
        if (this._config.stroke) {
            ctx.strokeStyle = str(this._config.stroke)
            ctx.lineWidth = num(this._config.width)
            ctx.stroke()
        }
        ctx.restore()
    }
}