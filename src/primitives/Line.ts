import { computed, Signal } from "signia";
import { Point } from "./Point";
import { NumSig, PointSig, PointSignal, toPointSig } from "../utils/signalTypes";
import { num, TransformConfig, transformPoint } from "../math/matrix";
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
        const x = computed('x', () => (1-num(t)) * this.p1.x + num(t) * this.p2.x)
        const y = computed('y', () => (1-num(t)) * this.p1.y + num(t) * this.p2.y)
        return new Point(x, y)
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
        return new Line({ p1, p2}) // FIXME: use .with?
    }
}