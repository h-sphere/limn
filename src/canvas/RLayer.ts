import { computed, Signal } from "signia";
import { Layer } from "../primitives/Layer";
import { LimnContext, PrimitiveRenderable, Renderable } from "./interfaces";

export class RLayer<T extends Renderable> extends PrimitiveRenderable<Layer<T>, {}> {

    private canvas: OffscreenCanvas | null = null
    private drawing: Signal<OffscreenCanvas> | null = null
    constructor(p: Layer<T>) {
        super(p, {})
    }

    parseConfig(): {} {
        return {}
    }

    setupDrawing(ctx: LimnContext) {
        const { width, height } = ctx.canvas
        this.canvas = new OffscreenCanvas(width, height)
        const innerCtx = this.canvas.getContext('2d')!
        this.drawing = computed('drawing', () => {
            // FIXME: bundle all redraws into a single one when needed
            // Inner context
            innerCtx.clearRect(0, 0, width, height);
            (this._p.items ?? []).forEach((e) => e.render(innerCtx))
            return this.canvas!
        })
    }

    render(ctx: LimnContext): void {
        if (!this.canvas) {
            this.setupDrawing(ctx)
        }
        ctx.drawImage(this.drawing!.value, 0, 0)
    }
    
}