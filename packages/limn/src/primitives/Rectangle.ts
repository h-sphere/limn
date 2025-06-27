import { computed } from "signia";
import { Point } from "./Point";
import { NumSig, PointSignal } from "../utils/signalTypes";
import { Path } from "./Path";
import { configToInternal } from "../utils/signals";

interface RectangleConfig {
    p1: PointSignal,
    p2: PointSignal,
    /**
     * @deprecated
     */
    angle?: NumSig
}

// FIXME: should rectangle have angle or should it just get transformed to polygon when rotated?
export class Rectangle extends Path  {
    declare readonly p1: Point
    declare readonly p2: Point
    declare readonly angle: number
    protected defaults = { angle: 0 }

    _config: any // FIXME

    constructor(conf: RectangleConfig) {
        super([])
        this._config = configToInternal<RectangleConfig>(conf)
                for (const key in this._config) {
                    Object.defineProperty(this, key, {
                        get: () => this._config[key].value,
                        enumerable: true,
                    })
                }
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

    @computed get points() {
        const points = computed('points', () => [
            this.p1,
            new Point(this.p1.x, this.p2.y),
            this.p2,
            new Point(this.p2.x, this.p1.y)
        ])
        return points.value
    }

    @computed get length(): number {
        return 4
    }
}