import { atom, Computed, computed, isSignal, Signal } from "signia"
import { BaseShape } from "../utils/base"
import { Point } from "./Point"
import { Clipper, FillRule, Path64, Paths64 } from "clipper2-js"
import { TransformConfig } from "../math/matrix"
import { PathsArray } from "./PathsArray"
import { ReactiveArray } from "./ReactiveArray"

type MapFn<T> = (item: T, index: number) => T;

type Arr = Array<Point> | Signal<Array<Point>> | Signal<ReactiveArray<Point>> | ReactiveArray<Point>

export class Path extends BaseShape<{}> {
    protected defaults = {}

    private _points //: Signal<Array<Point>> | Signal<ReactiveArray<Point>>

    constructor(points: Arr) {
        super({})
        if (isSignal(points)) {
            this._points = points
        } else {
            this._points = atom('points', points)
        }
    }

    @computed get points(): Array<Point> | ReactiveArray<Point> {
        return this._points.value
    }

    get(id: number) {
        return this.points.at(id)
    }

    @computed get length() {
        return this.points.length
    }

    @computed get serialised(): number[] | ReactiveArray<number> {
        // fixing issue with incompatible flatMap interfaces.
        if (Array.isArray(this.points)) {
            return this.points.flatMap(p => p.xy)
        }
        return this.points.flatMap<number>(p => p.xy as any as number) // FIXME: fix this typing
    }

    get path64() {
        // FIXME: make this fully reactive
        const s = this.serialised
        if (Array.isArray(s)) {
            return Clipper.makePath(s)
        }
        return Clipper.makePath(s.items)
    }

    get paths64() {
        const p = new Paths64()
        p.push(this.path64)
        return p
    }

    static fromPath64(path: Path64 | undefined) {
        if (!path || !path.length) {
            return new Path([])
        }
        const points = []

        for (let i=0;i<path.length;i++) {
            const point = path.at(i)!
            points.push(new Point(point.x, point.y))
        }
        return new Path(points)
    }

    intersect(p2: Path | PathsArray) {
        const path = computed('intersection points', () => Clipper.Intersect(this.paths64, p2.paths64, FillRule.NonZero))
        return PathsArray.fromPaths64(path)
    }

    diff(p2: Path | PathsArray) {
        const path = computed('diff points', () => Clipper.Difference(this.paths64, p2.paths64, FillRule.NonZero))
        return PathsArray.fromPaths64(path)
    }

    map(mapFn: MapFn<Point>): Path {
        // FIXME: better typing here.
        const points = computed('points', () => this.points.map((p, i) => mapFn(p, i))) as Computed<Array<Point>> | Computed<ReactiveArray<Point>>
        return new Path(points)
    }

    transform(c: TransformConfig): Path {
        return this.map(p => p.transform(c))
    }

    // offset(v: NumSig) {
    //     const points = computed('offset points', () => {
    //         // FIXME: proper offset.
    //         const offset = Clipper.InflatePaths(this.paths64, num(v), JoinType.Bevel, EndType.Joined)
    //         if (!offset || !offset.length) {
    //             return []
    //         }
    //         return offset.at(0)!.map(p => new Point(p.x, p.y))
    //     })
    //     return new Path({ points })
    // }
}