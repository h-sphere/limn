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
        if (this._config.fill) {
            ctx.fillStyle = color(this._config.fill)
            ctx.fill()
        }
        if (this._config.stroke) {
            ctx.strokeStyle = color(this._config.stroke)
            ctx.lineWidth = num(this._config.width)
            ctx.stroke()
        }
        ctx.restore()
    }
}