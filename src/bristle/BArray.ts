import { computed, Signal } from "signia";
import { ReactiveArray } from "../primitives/ReactiveArray"
import { BristleContext, Renderable } from "./interfaces";

export class BArray<T extends Renderable> extends ReactiveArray<T> implements Renderable {
    constructor(a: ReactiveArray<T>) {
        super(a._items)
    }
    get state(): Signal<any, unknown> {
        return computed('BArray.state', () => {
            items: this.items
        })
    }

    render(ctx: BristleContext) {
        this.items.forEach(i => i.render(ctx))
    }

    static from<T extends Renderable>(array: ReactiveArray<T>) {
        return new BArray(array)
    }

}