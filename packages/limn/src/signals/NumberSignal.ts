import { Signal } from "signia";
import { LimnSignal } from "./Signal";
import { num } from "../math/matrix";

const value = num // fixme: probably need new implementation

export class NumberSignal extends LimnSignal<number> {
    add(n: number | NumberSignal | Signal<number>) {
        return new NumberSignal(() => this.value + value(n))
    }

    multiply(n: number | NumberSignal | Signal<number> | (() => number)) {
        if (typeof n === 'function') {
            return new NumberSignal(() => this.value * numberSignal(n).value)
        }
        return new NumberSignal(() => this.value * value(n))
    }

    
}

export const numberSignal = (n: number | Signal<number> | (() => number)) => {
    return new NumberSignal(n)
}