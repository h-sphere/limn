import { computed, isAtom } from "signia";
import { num, transform, TransformConfig, transformPoint } from "../math/matrix";
import { Transformable } from "../utils/transformable";
import { NumSig, PointSignal, toPointSig } from "../utils/signalTypes";
import { configToInternal, ConfigToSignal } from "../utils/signals";

interface PointConfig {
    x: NumSig
    y: NumSig
}

const isPointConfig = (conf: PointConfig | NumSig): conf is PointConfig => {
    return (typeof conf === 'object') && 'x' in conf && 'y' in conf
}


// Point is the only one that cannot use BaseShape as it is being refered in there. we cannot have circular dependency.

export class Point implements Transformable<Point> {
    protected defaults: Required<Pick<PointConfig, never>> = {}
    private _config: ConfigToSignal<PointConfig>

    constructor(conf: PointConfig);
    constructor(x: NumSig, y: NumSig);
    constructor(conf: PointConfig | NumSig, y?: NumSig) {
        this._config = configToInternal(isPointConfig(conf) ? conf : { x: conf, y: y ?? 0 })
    }

    get x(): number {
        return this._config.x.value
    }

    get y(): number {
        return this._config.y.value
    }

    // constructor(x: NumSig, y: NumSig) {
    //     this.#x = toNumberSig(x)
    //     this.#y = toNumberSig(y)
    // }

    // @computed get x(): number {
    //     return this.#x.value
    // }

    set x(newValue: NumSig) {
        if (isAtom(this._config.x)) {
            this._config.x.set(num(newValue))
            return
        }
        throw new Error('Cannot set value of a computed signal')
    }

    // @computed get y(): number {
    //     return this.#y.value
    // }

    set y(newValue: NumSig) {
        if (isAtom(this._config.y)) {
            this._config.y.set(num(newValue))
            return
        }
        throw new Error('Cannot set value of a computed signal')
    }

    @computed get xy(): [number, number] {
        return [this.x, this.y] as const
    }

    set xy([x, y]: [NumSig, NumSig]) {
        this.x = x
        this.y = y
    }

    @computed get yx(): [number, number] {
        return [this.y, this.x] as const
    }

    // set yx([y, x]: [NumSig, NumSig]) {
    //     this.y = y
    //     this.x = x
    // }


    add<P extends NumSig | Point>(xDiff: P, ...[yDiff]: P extends Point ? [] : [NumSig]) {
        let newX, newY
        if (xDiff instanceof Point) {
            newX = computed('newX', () => this.x + xDiff.x)
            newY = computed('newY', () => this.y + xDiff.y)
        } else {
            // Create computed atoms that depend on the original point's signals
            newX = computed('newX', () => this.x + num(xDiff))
            newY = computed('newY', () => this.y + num(yDiff!))
        }
        return new Point(newX, newY)
    }

    mul(v: NumSig) {
        return new Point(
            computed('x', () => this.x * num(v)),
            computed('y', () => this.y * num(v))
        )
    }

    transform(c: TransformConfig): Point {
        const t =  computed('transform', () => {
            const m = transform(c)
            return transformPoint(m.value, this)
        })
        const x = computed('x', () => t.value.value[0])
        const y = computed('y', () => t.value.value[1])
        return new Point(x, y)
    }

    distance(p: PointSignal) {
        const pp = toPointSig(p)
        const xDiff = this.x - pp.value.x
        const yDiff = this.y - pp.value.y
        return Math.sqrt(xDiff*xDiff + yDiff*yDiff)
    }
}

export const point = (...args: ConstructorParameters<typeof Point>) => new Point(...args)