import { computed, isSignal, Signal } from "signia"

export type LimnContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

export interface Renderable {
    render(ctx: LimnContext): void
}

const getValue = <T>(t: T | Signal<T>): T => {
    if (isSignal(t)) {
        return t.value
    }
    return t
}

export type ConfigOptions<Config, Parent> = Partial<Config> | Signal<Partial<Config>> | ((p: Parent) => Partial<Config>) | Signal<(p: Parent) => Partial<Config>>
export type ConfigOptionsArray<Config, Parent> = Partial<Config> | Signal<Partial<Config>> | ((p: Parent, i: number) => Partial<Config>) | Signal<(p: Parent, i: number) => Partial<Config>>

export type ConfigForRenderable<R> = R extends PrimitiveRenderable<infer P, infer C> ? ConfigOptions<P, C> : never

export abstract class PrimitiveRenderable<Parent, Config> implements Renderable {
    protected _p: Parent
    constructor(p: Parent, private __config: ConfigOptions<Config, Parent>) {
        this._p = p
        // this._config = this.parseConfig(config)
    }
    abstract parseConfig(config: Partial<Config>): Config
    abstract render(ctx: LimnContext): void

    @computed get config() {
        const val = getValue(this.__config)
        if (typeof val === 'function') {
            return this.parseConfig(val(this._p))
        }
        return this.parseConfig(val)
    }
}