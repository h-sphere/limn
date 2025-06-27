import { Text } from "../primitives/Text";
import { Color } from "../utils/configs";
import { color } from "../utils/signalTypes";
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
        ctx.fillStyle = color(this._config.color)
        ctx.beginPath()
        ctx.font = `${this._p.size}px Arial`
        let [x, y] = this._p.position.xy
        if (this._p.anchor !== 'bottom-left') {
            const [vertical, horizontal] = (this._p.anchor ?? '').split('-')
            // we need to compute size
            const metrics = ctx.measureText(this._p.text)
            const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            switch (vertical) {
                case 'center':
                case 'middle':
                    y += h / 2
                    break
                case 'top':
                case 'left':
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

        if (this._p.width <= 0) {
            ctx.fillText(this._p.text, x, y)
            return
        }


        const width = this._p.width!

        let line = ''
        const words = this._p.text.split(' ') // Fixme: any whitespace would do but we need to reconstruct it later
        let rows = 0
        const overallMeasure = ctx.measureText(this._p.text)

        for (let word of words) {
            const measure = ctx.measureText(line + ' ' + word)
            if (measure.width >= width) {
                // flushing current one
                if (line.length) {
                    ctx.fillText(line, x, y + rows * (overallMeasure.actualBoundingBoxAscent + overallMeasure.actualBoundingBoxDescent))
                    rows++
                    line = ''
                    length = 0
                }
            }
            if (line.length) {
                line += ' ' + word
            } else {
                line += word
            }
            length = line.length
        }
        if (line) {
            ctx.fillText(line, x, y + rows * (overallMeasure.actualBoundingBoxAscent + overallMeasure.actualBoundingBoxDescent))
        }

        // ctx.fillText(this._p.text, x, y)
    }
}