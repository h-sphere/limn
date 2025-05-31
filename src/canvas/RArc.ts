import { num } from "../math/matrix";
import { Arc } from "../primitives/Arc";
import { Color, Size } from "../utils/configs";
import { color } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RArcConfig {
    width: Size
    stroke: Color

}

export class RArc extends PrimitiveRenderable<Arc, RArcConfig> {
    parseConfig(config: Partial<RArcConfig>): RArcConfig {
        return {
            stroke: config.stroke ?? 'red',
            width: config.width ?? 1
        }
    }
    render(ctx: LimnContext) {
        const center = this._p.center
        const radius = this._p.radius
        const start = this._p.start * 2 * Math.PI
        const end = this._p.end * 2 * Math.PI
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius, start, end)
        if (this._config.stroke) {
            ctx.strokeStyle = color(this._config.stroke)
            ctx.lineWidth = num(this._config.width)
            ctx.stroke()
        }
    }
}