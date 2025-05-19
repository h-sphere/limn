import { computed } from "signia";
import { Point } from "./Point";
import { NumSig } from "../utils/signalTypes";
import { num } from "../math/matrix";

export class Line {
    constructor(
        private readonly _p1: Point,
        private readonly _p2: Point) {
    }

    get p1() {
        return this._p1
    }

    get p2() {
        return this._p2
    }

    get length() {
        const xDiff = this.p2.x - this.p1.x
        const yDiff = this.p2.y - this.p1.y
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    }

    get center() {
        const xDiff = computed('x', () => this.p1.x + (this.p2.x - this.p1.x) / 2)
        const yDiff = computed('y', () => this.p1.y + (this.p2.y - this.p1.y) / 2)
        return new Point(xDiff, yDiff)
    }

    lerp(t: NumSig) {
        const x = computed('x', () => (1-num(t)) * this.p1.x + num(t) * this.p2.x)
        const y = computed('y', () => (1-num(t)) * this.p1.y + num(t) * this.p2.y)
        return new Point(x, y)
    }
}