import { Clipper, FillRule, Paths64 } from "clipper2-js";
import { Path } from "./Path";
import { ReactiveArray } from "./ReactiveArray";
import { computed, Signal } from "signia";
import { Point } from "./Point";
import { TransformConfig } from "../math/matrix";

export class PathsArray extends ReactiveArray<Path> {
    get paths64() {
        return new Paths64(...this.items.map(p => p.path64))
    }

    intersect(p2: Path | PathsArray) {
        const paths = computed('intersect', () =>
            Clipper.Intersect(this.paths64, p2.paths64, FillRule.NonZero)
        )
        return PathsArray.fromPaths64(paths)
    }

    transform(c: TransformConfig): PathsArray {
        return new PathsArray(this.map(p => p.transform(c)).items) // FIXME: instead of getting items, there might be better way?
    }

    static fromPaths64(inpPaths: Signal<Paths64>) {
        const paths = computed('paths', () => {
            const p = inpPaths.value
            if (p.length <= 0) {
                return []
            }
            return p.map(path => new Path(path.map(p => new Point(p.x, p.y))))
        })

        return new PathsArray(paths)
    }
}