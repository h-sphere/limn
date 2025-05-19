import { atom, computed, Signal } from "signia";
import { Point } from "./Point";
import { NumSig, toNumberSig } from "../utils/signalTypes";

// FIXME: should rectangle have angle or should it just get transformed to polygon when rotated?
export class Rectangle  {
    #p1: Signal<Point>
    #p2: Signal<Point>
    #angle: Signal<number>
    constructor(p1: Point, p2: Point, angle?: NumSig) {
        // FIXME: properly organise values of this rect based on order
        this.#p1 = atom('p1', p1)
        this.#p2 = atom('p2', p2)
        this.#angle = toNumberSig(angle ?? 0)
    }

    @computed get p1() {
        return this.#p1.value
    }

    @computed get p2() {
        return this.#p2.value
    }

    @computed get angle() {
        return this.#angle.value
    }

    @computed get center() {
        // FIXME: how to make this computable?
        const x = computed('x', () => this.p1.x + (this.p2.x - this.p1.x) / 2)
        const y = computed('y', () => this.p1.y + (this.p2.y - this.p1.y) / 2)
        return new Point(x, y)
    }

    @computed get size() {
        const x = computed('x', () => this.p2.x - this.p1.x)
        const y = computed('y', () => this.p2.y - this.p1.y)

        return new Point(x, y)
    }
}