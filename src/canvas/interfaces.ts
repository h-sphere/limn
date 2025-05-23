export type LimnContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

export interface Renderable {
    render(ctx: LimnContext): void
}

export abstract class PrimitiveRenderable<Parent, Config> implements Renderable {
    protected _p: Parent
    protected _config: Config
    constructor(p: Parent, config: Partial<Config>) {
        this._p = p
        this._config = this.parseConfig(config)
    }
    abstract parseConfig(config: Partial<Config>): Config
    abstract render(ctx: LimnContext): void
}