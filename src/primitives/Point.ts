import { atom, Atom, computed, Signal, isAtom } from "signia";
import { num, transform, TransformConfig, transformPoint } from "../math/matrix";
import { Transformable } from "../utils/transformable";
import { NumSig } from "../utils/signalTypes";

// FIXME: allow constructor to use signals too.

export class Point implements Transformable<Point> {
    #x: Signal<number>
    #y: Signal<number>
    constructor(x: number | Signal<number>, y: number | Signal<number>) {
        if (typeof x === 'number') {
            this.#x = atom('x', x)
        } else {
            this.#x = x
        }

        if (typeof y === 'number') {
            this.#y = atom('y', y)
        } else {
            this.#y = y
        }
    }

    get x() {
        return this.#x.value
    }

    set x(newValue: number) {
        if (isAtom(this.#x)) {
            this.#x.set(newValue)
            return
        }
        throw new Error('Cannot set value of a computed signal')
    }

    get xSignal() {
        return this.#x
    }

    get y() {
        return this.#y.value
    }

    get xy() {
        return [this.x, this.y] as const
    }

    get yx() {
        return [this.y, this.x] as const
    }

    set y(newValue: number) {
        if (isAtom(this.#y)) {
            this.#y.set(newValue)
            return
        }
        throw new Error('Cannot set value of a computed signal')
    }

    get ySignal() {
        return this.#y
    }

    add(xDiff: NumSig, yDiff: NumSig) {
        // Create computed atoms that depend on the original point's signals
        const newX = computed('newX', () => this.xSignal.value + num(xDiff))
        const newY = computed('newY', () => this.ySignal.value + num(yDiff))
        return new Point(newX, newY)
    }



    transform(c: TransformConfig): Point {
        const t =  computed('transform', () => {
            const m = transform(c)
            return transformPoint(m.value, this)
        })
        const x = computed('x', () => t.value.value[0])
        const y = computed('y', () => t.value.value[1])
        return new Point(x, y)
    }
}