import { num } from "../math/matrix";
import { Polygon } from "../primitives/Polygon";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
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
        if (!p.length) {
            return
        }
        for (let i=0;i<num(this._p.n);i++) {
            const point = p.get(i)!
            ctx.lineTo(...point.xy)
        }
        ctx.lineTo(...p.get(0)!.xy)
        const config = this.config
        if (config.fill) {
            ctx.fillStyle = color(config.fill)
            ctx.fill()
        }
        if (config.stroke) {
            ctx.strokeStyle = color(config.stroke)
            ctx.lineWidth = num(config.width)
            ctx.stroke()
        }
        ctx.restore()
    }
}