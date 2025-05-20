import { Atom, atom, computed, isSignal, Signal } from "signia";
import { ReactiveArray } from "../primitives/ReactiveArray";
import { BristleContext, PrimitiveRenderable, Renderable } from "./interfaces";

const isArraySignal = <T>(t: Signal<T[]> | ReactiveArray<T> | Signal<ReactiveArray<T>>): t is Signal<T[]> => {
    return isSignal(t) && Array.isArray(t)
}

export class BArray<T extends Renderable> implements Renderable {
    arr: Signal<ReactiveArray<T>>
    constructor(arr: ReactiveArray<T> | Signal<ReactiveArray<T>>) {
        if (isSignal(arr)) {
            this.arr = computed('x', () => arr.value)
        } else {
            this.arr = atom('arr', arr)
        }
        // if (isSignal(arr)) {
        //     if (isArraySignal(arr)) {
        //         this.arr = atom('arr', new ReactiveArray(computed('x', () => arr.value)))
        //     } else {
        //         this.arr = atom('arr', computed('ar', () => arr.value)) as any
        //     }
        // }
        // this.arr = atom('arr', arr) as any
    }

    render(ctx: BristleContext) {
        (this.arr.value.items ?? []).forEach(i => {
            if (i.render) {
                i.render(ctx)
            }
        })
    }

}