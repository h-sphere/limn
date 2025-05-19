import { atom, computed, isAtom, isSignal, Signal } from "signia";
import { NumSig, PointSig } from "../utils/signalTypes";
import { num } from "../math/matrix";
import { Point } from "./Point";

type PointSignal = PointSig | Signal<Point>

const toPointSig = (p: PointSignal) => {
    if (isSignal(p)) {
        return p
    }
    if (Array.isArray(p)) {
        return atom('point', new Point(...p))
    }
    return atom('point', p)
}


export class CubicBezierCurve {
    #p1: Signal<Point>
    #p2: Signal<Point>
    #c1: Signal<Point>
    #c2: Signal<Point>
    constructor(p1: PointSignal, p2: PointSignal, c1: PointSignal, c2: PointSignal) {
        this.#p1 = toPointSig(p1)
        this.#p2 = toPointSig(p2)
        this.#c1 = toPointSig(c1)
        this.#c2 = toPointSig(c2)
    }

    @computed get p1(): Point {
        return this.#p1.value
    }

    set p1(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#p1)) {
            this.#p1.set(v)
        }
    }

    @computed get p2(): Point {
        return this.#p2.value
    }

    set p2(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#p2)) {
            this.#p2.set(v)
        }
    }

    @computed get c1(): Point {
        return this.#c1.value
    }

    set c1(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#c1)) {
            this.#c1.set(v)
        }
    }

    @computed get c2(): Point {
        return this.#c2.value
    }

    set c2(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#c2)) {
            this.#c2.set(v)
        }
    }

    lerp(t: NumSig) {
        const nums = computed('lerp', () => {
            const onemint = computed('1 - t', () => 1 - num(t))
            return this.p1.mul(computed('num', () => Math.pow(onemint.value, 3)))
            .add(
                this.c1.mul(computed('', () => 3 * onemint.value * onemint.value * num(t)))
            )
            .add(
                this.c2.mul(computed('', () => 3 * onemint.value * num(t) * num(t)))
            )
            .add(
                this.p2.mul(computed('', () => Math.pow(num(t), 3)))
            )
        })
        return new Point(computed('x', () => nums.value.x), computed('y', () => nums.value.y))
    }
}