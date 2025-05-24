import { num } from "../math/matrix";
import { Rectangle } from "../primitives/Rectangle";
import { Color, Size } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RRectangleConfig {
    fillStyle: Color
    strokeStyle: Color
    width: Size
}

export class RRectangle extends PrimitiveRenderable<Rectangle, RRectangleConfig> {
    parseConfig(config: Partial<RRectangleConfig>): RRectangleConfig {
        return {
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? '',
            width: config?.width ?? 1
        }
    }

    render(ctx: LimnContext) {
        ctx.beginPath()
        if (this._config.fillStyle) {
            ctx.fillStyle = str(this._config.fillStyle)
            ctx.fillRect(...this._p.p1.xy, ...this._p.size.xy)
        }

        if (this._config.strokeStyle) {
            ctx.strokeStyle = str(this._config.strokeStyle)
            ctx.lineWidth = num(this._config.width)
            ctx.strokeRect(...this._p.p1.xy, ...this._p.size.xy)
        }
    }
}