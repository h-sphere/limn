import { computed, Signal } from "signia";
import { Line } from "../primitives/Line";
import { BristleContext, Renderable } from "./interfaces";

interface BLineConfig {
    width: number;
    color: string;
}

export class BLine extends Line implements Renderable {
    #config: BLineConfig
    constructor(l: Line, config?: Partial<BLineConfig>) {
        super(l.p1, l.p2)
        this.#config = {
            width: config?.width ?? 1,
            color: config?.color ?? 'black'
        }
    }
    get state(): Signal<any, unknown> {
        return computed('BLine.state', () => ({
            p1: this.p1,
            p2: this.p2,
            config: this.#config
        }))
    }

    render(ctx: BristleContext) {
        ctx.strokeStyle = this.#config.color
        ctx.lineWidth = this.#config.width
        ctx.beginPath()
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
    }

    static from(l: Line, config?: Partial<BLineConfig>) {
        return new BLine(l, config)
    }
}