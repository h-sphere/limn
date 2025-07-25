import { computed } from "signia";
import { GenerativeCollection } from "./GenerativeCollection";
import { Point } from "./Point";
import { Line } from "./Line";
import { NumSig, PointSignal } from "../utils/signalTypes";
import { getx, gety, num } from "../math/matrix";
import { Path } from "./Path";
import { configToInternal } from "../utils/signals";

interface PolygonConfig {
    center: PointSignal,
    radius: NumSig,
    n: NumSig,
    angle?: NumSig
}

export class Polygon extends Path { //BaseShape<PolygonConfig> {
    declare readonly center: Point
    declare readonly radius: number
    declare readonly n: number
    declare readonly angle: number
    protected defaults = { angle: 0 }

    protected _c

    constructor(conf: PolygonConfig) {
        super([])
        this._c = configToInternal<PolygonConfig>(conf)
        for (const key in this._c) {
            Object.defineProperty(this, key, {
                get: () => this._c[key as keyof typeof this._c]?.value,
                enumerable: true,
            })
        }
    }

    get points() {
        // FIXME: BOTH WILL CHANGE PROBABLY.
        return new GenerativeCollection(this.n, (i) => {
            const r = num(this.radius)
            const a = num(this.angle ?? 0)
            const n = num(this.n)
            // make points
            const angle = 2 * Math.PI / n
            const x = computed('x', () => getx(this.center) + r * Math.cos(a + i * angle))
            const y = computed('y', () => gety(this.center) + r * Math.sin(a + i * angle))
            return new Point(x, y)
        })
    }

    get edges() {
        const points = this.points
        return points.map((p, i) =>
            new Line(p, points.get((i + 1) % Math.floor(num(this.n)))!)
        )
    }
}