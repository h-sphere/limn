import { Rectangle } from "../primitives/Rectangle";
import { BristleContext, PrimitiveRenderable } from "./interfaces";

export interface BRectangleConfig {
    fillStyle: string
    strokeStyle: string
    width: number
}

export class BRectangle extends PrimitiveRenderable<Rectangle, BRectangleConfig> {
    parseConfig(config: Partial<BRectangleConfig>): BRectangleConfig {
        return {
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? '',
            width: config?.width ?? 1
        }
    }

    render(ctx: BristleContext) {
        ctx.beginPath()
        if (this._config.fillStyle) {
            ctx.fillStyle = this._config.fillStyle
            ctx.fillRect(...this._p.p1.xy, ...this._p.size.xy)
        }

        if (this._config.strokeStyle) {
            ctx.strokeStyle = this._config.strokeStyle
            ctx.lineWidth = this._config.width
            ctx.strokeRect(...this._p.p1.xy, ...this._p.size.xy)
        }
    }
}