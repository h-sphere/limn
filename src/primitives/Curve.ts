import { isAtom } from "signia";
import { PointSig } from "../utils/signalTypes";

export class Curve {
    #p1: PointSig
    #p2: PointSig
    #c1: PointSig
    #c2?: PointSig
    constructor(p1: PointSig, p2: PointSig, c1: PointSig, c2?: PointSig) {
        this.#p1 = p1
        this.#p2 = p2
        this.#c1 = c1
        this.#c2 = c2
    }

    get p1() {
        return this.#p1
    }

    set p1(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#p1)) {
            this.#p1.set(v)
        }
    }

    get p2() {
        return this.#p2
    }

    set p2(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#p2)) {
            this.#p2.set(v)
        }
    }

    get c1() {
        return this.#c1
    }

    set c1(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#c1)) {
            this.#c1.set(v)
        }
    }

    get c2(): PointSig | undefined {
        return this.#c2
    }

    set c2(v: PointSig) {
        // FIXME: we need to do abstract thing here
        if (isAtom(this.#c2)) {
            this.#c2.set(v)
        }
    }
}