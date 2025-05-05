import { atom, computed, isAtom, Signal } from "signia";
import { ReactiveArray } from "./ReactiveArray";

export class GenerativeCollection<T> extends ReactiveArray<T> {
    #n: Signal<number>;
    constructor(n: number | Signal<number>, private readonly factory: (index: number) => T) {
        let length 
        if (typeof n === 'number') {
            length = atom('count', n)
        } else {
            length = n
        }
        super(computed('elements', () => {
            const elements: T[] = [];
            const count = Math.floor(length.value)
            for (let i=0;i<count;i++) {
                elements.push(factory(i))
            }
            return elements
        }))
        this.#n = length
    }
    
    get length() {
        return this.#n.value
    }

    set length(v: number) {
        if (isAtom(this.#n)) {
            this.#n.set(v)
        }
    }
}