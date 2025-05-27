import { computed } from "signia";
import { Point } from "./Point";
import { NumSig, PointSignal } from "../utils/signalTypes";
import { BaseShape } from "../utils/base";

interface RectangleConfig {
    p1: PointSignal,
    p2: PointSignal,
    angle?: NumSig
}

// FIXME: should rectangle have angle or should it just get transformed to polygon when rotated?
export class Rectangle extends BaseShape<RectangleConfig>  {
    declare readonly p1: Point
    declare readonly p2: Point
    declare readonly angle: number
    protected defaults = { angle: 0 }

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