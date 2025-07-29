import { num } from "../math/matrix";
import { Path } from "../primitives/Path";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RPathConfig {
    width: Size;
    fill: Color;
    stroke: Color;
}

export class RPath extends PrimitiveRenderable<Path, RPathConfig> {
    parseConfig(config: Partial<RPathConfig>): RPathConfig {
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
        for (let i=0;i<num(p.length);i++) {
            const point = p.at(i)!
            ctx.lineTo(...point.xy)
        }
        ctx.lineTo(...p.at(0)!.xy)
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