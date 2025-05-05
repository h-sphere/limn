import { atom, Atom } from "signia";
import { Point } from "./Point";

export class Circle {
    #center: Atom<Point>
    #radius: number
    constructor(center: Point, radius: number) {
        // FIXME: properly organise values of this rect based on order
        this.#center = atom('center', center)
        this.#radius = radius
    }

    get center() {
        return this.#center.value
    }

    get radius() {
        return this.#radius
    }
}