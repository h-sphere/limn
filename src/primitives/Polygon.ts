import { atom, computed, isAtom, Signal } from "signia";
import { GenerativeCollection } from "./GenerativeCollection";
import { Point } from "./Point";
import { Line } from "./Line";
import { NumSig, PointSig } from "../utils/signalTypes";
import { getx, gety, num, xy } from "../math/matrix";

export class Polygon {
    #n: NumSig
    #radius: NumSig
    #center: PointSig
    #angle: NumSig
    constructor(center: PointSig, n: NumSig, radius: NumSig, angle: NumSig = 0) {
        this.#n = n
        this.#center = center
        this.#radius = radius
        this.#angle = angle
    }

    set length(v: number) {
        if (isAtom(this.#n)) {
            this.#n.set(v)
        }
    }

    get n() {
        return this.#n
    }

    get radius() {
        return this.#radius
    }

    get angle() {
        return this.#angle
    }

    get center() {
        return this.#center
    }

    get points() {
        // FIXME: BOTH WILL CHANGE PROBABLY.
        return new GenerativeCollection(this.#n, (i) => {
            const r = num(this.radius)
            const a = num(this.angle)
            const n = num(this.n)
            // make points
            const angle = 2 * Math.PI / n
            const x = computed('x', () => getx(this.#center) + r * Math.cos(a + i * angle))
            const y = computed('y', () => gety(this.#center) + r * Math.sin(a + i * angle))
            return new Point(x, y)
        })
    }

    get edges() {
        const points = this.points
        return points.map((p, i) =>
            new Line(p, points.get((i + 1) % Math.floor(num(this.n))))
        )
    }
}