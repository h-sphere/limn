import { atom, computed, isSignal, Signal } from "signia";
import { ReactiveArray } from "../primitives/ReactiveArray";
import { BristleContext, Renderable } from "./interfaces";

export class BArray<T extends Renderable> implements Renderable {
    arr: Signal<ReactiveArray<T>>
    constructor(arr: ReactiveArray<T> | Signal<ReactiveArray<T>>) {
        if (isSignal(arr)) {
            this.arr = computed('x', () => arr.value)
        } else {
            this.arr = atom('arr', arr)
        }
    }

    render(ctx: BristleContext) {
        (this.arr.value.items ?? []).forEach(i => {
            if (i.render) {
                i.render(ctx)
            }
        })
    }

}