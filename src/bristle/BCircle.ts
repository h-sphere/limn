import { computed, Signal } from "signia";
import { Circle } from "../primitives/Circle";
import { BristleContext, Renderable } from "./interfaces";

export interface BCircleConfig {
    width: number
    fillStyle: string
    strokeStyle: string

}

export class BCircle extends Circle implements Renderable {
    
    #config: BCircleConfig

    constructor(c: Circle, config?: Partial<BCircleConfig>) {
        super(c.center, c.radius) // FIXME: properly setup center
        this.#config = {
            width: config?.width ?? 1,
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? ''
        }
    }
    get state(): Signal<any, unknown> {
        return computed('BCircle.state', () => ({
            center: this.center,
            radius: this.radius,
            config: this.#config
        }))
    }

    render(ctx: BristleContext) {
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
        if (this.#config.fillStyle) {
            ctx.fillStyle = this.#config.fillStyle
            ctx.fill()
        }
        if (this.#config.strokeStyle) {
            ctx.strokeStyle = this.#config.strokeStyle
            ctx.lineWidth = this.#config.width
            ctx.stroke()
        }
    }

    static from(c: Circle, config?: Partial<BCircleConfig>) {
        return new BCircle(c, config)
    }


}