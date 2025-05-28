import { PointSig } from "../utils/signalTypes";

export class BezierSpline {
    #points: PointSig[]
    constructor(points: PointSig[]) {
        this.#points = points
    }

    get points() {
        return this.#points
    }

    lerp(_c: number) {
        // FIXME: need to properly compute lerps of lerps or use matrix here.
    }
}