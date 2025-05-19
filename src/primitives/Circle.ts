import { atom, Atom, computed, isAtom, Signal } from "signia";
import { Point } from "./Point";
import { NumSig, toNumberSig } from "../utils/signalTypes";
import { num } from "../math/matrix";

export class Circle {
    #center: Signal<Point>
    #radius: Signal<number>
    constructor(center: Point, radius: NumSig) {
        // FIXME: properly organise values of this rect based on order
        this.#center = atom('center', center)
        this.#radius = toNumberSig(radius)
    }

    @computed get center(): Point {
        return this.#center.value
    }

    @computed get radius(): number {
        return this.#radius.value
    }

    set radius(newRadius: NumSig) {
        if (isAtom(this.#radius)) {
            this.#radius.set(num(newRadius))
            return
        }
        throw new Error('Cannot set value of a computed signal')
    }
}