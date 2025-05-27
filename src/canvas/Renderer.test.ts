import { Line } from "../primitives/Line"
import { Point } from "../primitives/Point"
import { RLine } from "./RLine"
import { RPoint } from "./RPoint"
import { LimnRenderer } from "./Renderer"

describe('Renderer', () => {
    it('should properly as for proper type when instantiating non-renderable objects', () => {
        const ctx = {} as any
        const renderer = new LimnRenderer(ctx)
        const p = new Point(10, 10)

        const ret = renderer.add(p, { color: 'red', radius: 1 })
        expect(ret).toBeInstanceOf(RPoint)

        const bpoint = renderer.add(new Point(10, 10), {
            color: 'red',
            radius: 1
        })
        expect(bpoint).toBeInstanceOf(RPoint)

        const res = renderer.add(new Line(p, p.add(100, 100)), {
            color: 'red',
            width: 1
        })
        expect(res).toBeInstanceOf(RLine)
    })
})