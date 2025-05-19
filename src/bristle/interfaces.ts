import { Signal } from "signia"

export type BristleContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
export interface Renderable {
    render(ctx: BristleContext): void
    get state(): Signal<any>
}