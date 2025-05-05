import { atom, Atom, computed } from "signia";
import { Point } from "./Point";
import { NumSig } from "../utils/signalTypes";
import { num, TransformConfig } from "../math/matrix";
import { Transformable } from "../utils/transformable";

export class Rectangle  {
    #p1: Atom<Point>
    #p2: Atom<Point>
    #angle: NumSig
    constructor(p1: Point, p2: Point, angle: NumSig) {
        // FIXME: properly organise values of this rect based on order
        this.#p1 = atom('p1', p1)
        this.#p2 = atom('p2', p2)
        this.#angle = angle
    }

    get p1() {
        return this.#p1.value
    }

    get p2() {
        return this.#p2.value
    }

    get angle() {
        return num(this.#angle)
    }

    get center() {
        // FIXME: how to make this computable?
        const x = computed('x', () => this.p1.x + (this.p2.x - this.p1.x) / 2)
        const y = computed('y', () => this.p1.y + (this.p2.y - this.p1.y) / 2)
        return new Point(x, y)
    }

    get size() {
        const x = computed('x', () => this.p2.x - this.p1.x)
        const y = computed('y', () => this.p2.y - this.p1.y)

        return new Point(x, y)
    }
}