import { ReactiveArray } from "../primitives/ReactiveArray";
import { BristleContext, PrimitiveRenderable, Renderable } from "./interfaces";

export class BArray<T extends Renderable> extends ReactiveArray<T> {
    constructor(arr: ReactiveArray<T>) {
        super(arr.items) // FIXME: is this enough?
    }

    render(ctx: BristleContext) {
        this.items.forEach(i => i.render(ctx))
    }

}