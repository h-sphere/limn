import { Signal } from "signia";
import { BristleContext, Renderable } from "../bristle/interfaces";
import { TurtleRenderConfig } from "../turtle/turtle";
import { Spectre } from "./spectre";

interface Settings {
    x: number,
    y: number,
    rotation: number,
    size: number,
    depth: number
}

export class SpectreTiling implements Renderable {
    constructor(private params: Settings, private readonly renderConfig: TurtleRenderConfig) {

    }
    get state(): Signal<any, unknown> {
        throw new Error("Method not implemented.");
    }
    render(ctx: BristleContext) {
        if (this.params.depth <= 0) {
            return
        }
        
        const s = new Spectre(this.params, this.renderConfig)
        const r = this.params.rotation
        
        const points = s.render(ctx)

        // new Spectre({
        //     x: points[0].x,
        //     y: points[0].y,
        //     size: this.params.size,
        //     rotation: 90
        // }, this.renderConfig).render(ctx)
        
        new SpectreTiling({
            x: points[4].x,
            y: points[4].y,
            size: this.params.size,
            rotation: r + 90,
            depth: this.params.depth -1
        }, this.renderConfig).render(ctx)

        new SpectreTiling({
            x: points[6].x,
            y: points[6].y,
            size: this.params.size,
            rotation: r + 30,
            depth: this.params.depth - 1
        }, this.renderConfig).render(ctx)

        new SpectreTiling({
            x: points[8].x,
            y: points[8].y,
            size: this.params.size,
            rotation: r -30,
            depth: this.params.depth - 1
        }, this.renderConfig).render(ctx)

        new SpectreTiling({
            x: points[10].x,
            y: points[10].y,
            size: this.params.size,
            rotation: r -90,
            depth: this.params.depth - 1
        }, this.renderConfig).render(ctx)
        
        


    }
}