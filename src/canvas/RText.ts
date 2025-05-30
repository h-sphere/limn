import { Text } from "../primitives/Text";
import { Color } from "../utils/configs";
import { str } from "../utils/signalTypes";
import { LimnContext, PrimitiveRenderable } from "./interfaces";

export interface RTextConfig {
    color: Color
}

export class RText extends PrimitiveRenderable<Text, RTextConfig> {
    parseConfig(config: Partial<RTextConfig>): RTextConfig {
        return {
            color: config.color ?? 'black',
        }
    }
    render(ctx: LimnContext) {
        ctx.fillStyle = str(this._config.color)
        ctx.beginPath()
        ctx.font = `${this._p.size}px Arial`
        let [x, y] = this._p.position.xy
        if (this._p.anchor !== 'top-left') {
            const [vertical, horizontal] = (this._p.anchor ?? '').split('-')
            // we need to compute size
            const metrics = ctx.measureText(this._p.text)
            console.log(metrics.actualBoundingBoxDescent)
            const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            switch (vertical) {
                case 'center':
                case 'middle':
                    y += h / 2
                    break
                case 'bottom':
                case 'right':
                    y += h
                    break
            }

            switch (horizontal) {
                case 'center':
                case 'middle':
                    x -= metrics.width / 2
                    break
                case 'right':
                case 'bottom':
                    x -= metrics.width
                break
            }
        }

        ctx.fillText(this._p.text, x, y)
    }
}