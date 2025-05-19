import { computed, Signal } from "signia";
import { Point } from "../primitives/Point";
import { Rectangle } from "../primitives/Rectangle";
import { BristleContext, Renderable } from "./interfaces";

interface BRectangleConfig {
    fillStyle: string
    strokeStyle: string
    width: number
}

export class BRectangle extends Rectangle implements Renderable {
    #config: BRectangleConfig
    constructor(r: Rectangle, config?: Partial<BRectangleConfig>) {
        super(r.p1, r.p2, r.angle)
        this.#config = {
            fillStyle: config?.fillStyle ?? '',
            strokeStyle: config?.strokeStyle ?? '',
            width: config?.width ?? 1
        }
    }
    get state(): Signal<any, unknown> {
        return computed('BRectange.state', () => ({
            p1: this.p1,
            p2: this.p2,
            angle: this.angle,
            config: this.#config
        }))
    }

    static from(r: Rectangle, config?: Partial<BRectangleConfig>) {
        return new BRectangle(r, config)
    }

    render(ctx: BristleContext) {
        ctx.beginPath()
        if (this.#config.fillStyle) {
            ctx.fillStyle = this.#config.fillStyle
            ctx.fillRect(this.p1.x, this.p1.y, this.size.x, this.size.y)
        }

        if (this.#config.strokeStyle) {
            ctx.strokeStyle = this.#config.strokeStyle
            ctx.lineWidth = this.#config.width
            ctx.strokeRect(this.p1.x, this.p1.y, this.size.x, this.size.y)
        }
    }
}