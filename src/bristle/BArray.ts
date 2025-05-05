import { ReactiveArray } from "../primitives/ReactiveArray"
import { BristleContext, Renderable } from "./interfaces";

export class BArray<T extends Renderable> extends ReactiveArray<T> implements Renderable {
    constructor(a: ReactiveArray<T>) {
        super(a._items)
    }

    render(ctx: BristleContext) {
        this.items.forEach(i => i.render(ctx))
    }

    static from<T extends Renderable>(array: ReactiveArray<T>) {
        return new BArray(array)
    }

}