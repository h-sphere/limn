import { computed } from "signia";
import { Point } from "./Point";
import { NumSig, PointSignal } from "../utils/signalTypes";
import { num, TransformConfig } from "../math/matrix";
import { BaseShape } from "../utils/base";

interface LineConfig {
    p1: PointSignal,
    p2: PointSignal
}

const isLineConfig = (c: LineConfig | PointSignal): c is LineConfig => {
    return typeof c === 'object' && 'p1' in c && 'p2' in c
}

export class Line extends BaseShape<LineConfig> {
    protected defaults = {}
    // #p1: Signal<Point>
    // // #p2: Signal<Point>
    // constructor(p1: PointSignal, p2: PointSignal) {
    //     this.#p1 = toPointSig(p1)
    //     this.#p2 = toPointSig(p2)
    // }

    declare p1: Point
    declare p2: Point
    constructor(config: LineConfig);
    constructor(p1: PointSignal, p2: PointSignal);
    constructor(p1: LineConfig | PointSignal, p2?: PointSignal) {
        super(isLineConfig(p1) ? p1 : { p1, p2: p2! })
    }

    // @computed get p1() {
    //     return this.#p1.value
    // }

    // @computed get p2() {
    //     return this.#p2.value
    // }

    @computed get length() {
        const xDiff = this.p2.x - this.p1.x
        const yDiff = this.p2.y - this.p1.y
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    }

    segment(start: NumSig, end?: NumSig) {
        return this.with(l => ({
            p1: l.lerp(!end ? 0 : num(start)),
            p2: l.lerp(!end ? num(start) : num(end))
        }))
        // const p0 = computed('p0', () => !end ? 0 : num(start))
        // const p1 = computed('p1', () => !end ? num(start) : num(end))
        // return new Line(this.lerp(p0), this.lerp(p1))
    }

    get normalized() {
        return this.scale(computed('len', () => 1 / this.length))
    }

    @computed get distance() {
        const x = computed('x', () => this.p2.x - this.p1.x)
        const y = computed('y', () => this.p2.y - this.p1.y)
        return new Point(x, y)
    }

    scale(n: NumSig) {
        const x = computed('x', () => this.p1.x + this.distance.x * num(n))
        const y = computed('y', () => this.p1.y + this.distance.y * num(n))
        return this.with({ p2: new Point(x, y) })
    }

    @computed get center() {
        const xDiff = computed('x', () => this.p1.x + (this.p2.x - this.p1.x) / 2)
        const yDiff = computed('y', () => this.p1.y + (this.p2.y - this.p1.y) / 2)
        return new Point(xDiff, yDiff)
    }

    lerp(t: NumSig) {
        const x = computed('x', () => (1 - num(t)) * this.p1.x + num(t) * this.p2.x)
        const y = computed('y', () => (1 - num(t)) * this.p1.y + num(t) * this.p2.y)
        return new Point(x, y)
    }

    get vector() {
        const x = computed('x', () => this.p1.x - this.p2.x)
        const y = computed('y', () => this.p1.y - this.p2.y)
        return new Point(x, y)
    }

    intersectionPoint(l2: Line) {
        return computed('point', () => {

            const denominator = computed('denom', () => {

                const x1 = this.p1.x, y1 = this.p1.y;
                const x2 = this.p2.x, y2 = this.p2.y;
                const x3 = l2.p1.x, y3 = l2.p1.y;
                const x4 = l2.p2.x, y4 = l2.p2.y;

                // Calculate the denominator
                return (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            })

            const t = computed('t', () => {
                const x1 = this.p1.x, y1 = this.p1.y;
                const x3 = l2.p1.x, y3 = l2.p1.y;
                const x4 = l2.p2.x, y4 = l2.p2.y;

                if (denominator.value < 1e-10) {
                    return -Infinity // FIXME: probably sth else here
                }
                const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator.value;
                if (t < 0 || t > 1) {
                    return -Infinity
                }
                return t

            })
            return this.lerp(t)
        }).value
    }

    @computed get tangent() {
        return this.transform({
            rotate: Math.PI / 2
        })
    }

    transform(c: TransformConfig) {
        if (!c.origin) {
            c.origin = this.p1
        }
        const p1 = computed('p1', () => this.p1.transform(c))
        const p2 = computed('p2', () => this.p2.transform(c))
        return new Line({ p1, p2 }) // FIXME: use .with?
    }
}