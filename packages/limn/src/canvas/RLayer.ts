import { computed, Signal } from "signia";
import { Layer } from "../primitives/Layer";
import { LimnContext, PrimitiveRenderable, Renderable } from "./interfaces";
import { LimnFill } from "../fills/limnFill";

export class RLayer<T extends Renderable> extends PrimitiveRenderable<Layer<T>, {}> implements LimnFill {

    private canvas: OffscreenCanvas = new OffscreenCanvas(0, 0)
    private ctx: OffscreenCanvasRenderingContext2D = this.canvas.getContext('2d')!
    private _drawing: Signal<OffscreenCanvas> | null = null
    constructor(p: Layer<T>) {
        super(p, {})
        this.setupDrawing()
    }

    parseConfig(): {} {
        return {}
    }

    setupDrawing() {
        // FIXME: make it work with 
        // react('redraw', () => {
        //     const width = this._p.config.width.value;
        //     const height = this._p.config.height.value;
        //     this.canvas.width = width
        //     this.canvas.height = height

        //     // FIXME: bundle all redraws into a single one when needed
        //     // Inner context
        //     this.ctx.clearRect(0, 0, width, height);
        //     (this._p.items ?? []).forEach((e) => e.render(this.ctx))
        // })
        this._drawing = computed('drawing', () => {
            console.log('redrawing')
            const width = this._p.config.width.value;
            const height = this._p.config.height.value;
            this.canvas.width = width
            this.canvas.height = height

            // FIXME: bundle all redraws into a single one when needed
            // Inner context
            this.ctx.clearRect(0, 0, width, height);
            (this._p.items ?? []).forEach((e) => e.render(this.ctx))
            return this.canvas!
        })
    }

    @computed get fill() {
        console.log('redrawing')
        const width = this._p.config.width.value;
        const height = this._p.config.height.value;
        this.canvas.width = width
        this.canvas.height = height

        // FIXME: bundle all redraws into a single one when needed
        // Inner context
        this.ctx.clearRect(0, 0, width, height);
        (this._p.items ?? []).forEach((e) => e.render(this.ctx))
        // return this.canvas!
        return this.ctx.createPattern(this.canvas, 'repeat')!
    }

    render(ctx: LimnContext): void {
        ctx.drawImage(this._drawing!.value, 0, 0)
    }
    
}