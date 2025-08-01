import { computed } from "signia";
import { Point } from "./Point";
import { NumSig, PointSignal } from "../utils/signalTypes";
import { num } from "../math/matrix";
import { Arc } from "./Arc";
import { BaseShape } from "../utils/base";
import { Polygon } from "./Polygon";

interface CircleConfig {
    center: PointSignal,
    radius: NumSig
}

export class Circle extends BaseShape<CircleConfig> {
    protected defaults = {}
    declare readonly center: Point
    declare readonly radius: number

    static init(conf: CircleConfig) {
        return new Circle(conf)
    }

    segment(start: NumSig, end?: NumSig) {
        const p0 = computed('p0', () => !end ? 0 : num(start))
        const p1 = computed('p1', () => !end ? num(start) : num(end))
        return new Arc({
            center: this._config.center,
            radius: this._config.radius,
            start: p0,
            end: p1
        })
    }

    lerp(n: NumSig) {
        const x = computed('x', () => this.center.x + this.radius * Math.cos(num(n) * 2 * Math.PI))
        const y = computed('y', () => this.center.y + this.radius * Math.sin(num(n) * 2 * Math.PI))
        return new Point(x, y)
    }

    isInside(p: PointSignal): boolean {
        return this.center.distance(p) <= this.radius
    }

    tesselate(n: NumSig = 30) {
        // start and end.
        return new Polygon({
            center: this._config.center,
            n,
            radius: this._config.radius
        })
    }
}