import { Line } from "../primitives/Line"
import { Point } from "../primitives/Point"
import { BPoint } from "./BPoint"
import { BristleRenderer } from "./Renderer"

describe('Renderer', () => {
    it('should properly as for proper type when instantiating non-renderable objects', () => {
        const ctx = {} as any
        const renderer = new BristleRenderer(ctx, 100, 100)
        const p = new Point(10, 10)
        const bpoint = renderer.add(new Point(10, 10), {
            color: 'red',
            width: 1
        })
        expect(bpoint).toBeInstanceOf(BPoint)

        renderer.add(new Line(p, p.add(100, 100)))
    })
})