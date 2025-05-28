import { NumSig, PointSignal } from "../utils/signalTypes";
import { num } from "../math/matrix";
import { Point } from "./Point";
import { BaseShape } from "../utils/base";
import { computed } from "signia";

interface ArcConfig {
    center: PointSignal,
    radius: NumSig,
    start?: NumSig,
    end?: NumSig
}



export class Arc extends BaseShape<ArcConfig> implements Required<ArcConfig> {
    protected defaults = {
        start: 0,
        end: 1
    }
    declare readonly center: Point
    declare readonly radius: number
    declare readonly start: number
    declare readonly end: number

    constructor(conf: ArcConfig) {
        super(conf)
        this.handleDefaults()
    }

    segment(end: NumSig): Arc;
    segment(start: NumSig, end: NumSig): Arc;
    segment(start: NumSig, end?: NumSig) {
        const p0 = computed('p0', () => this.start + (this.end - this.start) * (!end ? 0 : num(start)))
        const p1 = computed('p1', () => this.start + (this.end - this.start) * (!end ? num(start) : num(end)))
        return new Arc({
            center: this.center,
            radius: this.radius,
            start: p0,
            end: p1
        })
    }

    rotate(fullCircleRatio: NumSig) {
        return this.with(a => ({
            start: a.start + num(fullCircleRatio),
            end: a.end + num(fullCircleRatio)
        }))
    }

    // with(newConfig: UpdateConfig) {

    // }
}
