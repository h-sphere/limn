import { Circle, GenerativeCollection } from "../limn"
import { Line } from "../primitives/Line"
import { Point } from "../primitives/Point"
import { RLine } from "./RLine"
import { RPoint } from "./RPoint"
import { LimnRenderer } from "./Renderer"
import { LimnContext } from "./interfaces"

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

    it('should properly pass function to an array renderer', () => {
        const ctx = { } as unknown as LimnContext
        const renderer = new LimnRenderer(ctx)
        const arr = new GenerativeCollection(5, i => new Circle({ center: renderer.center, radius: i * 10 }))
        const arr2 = renderer.add(arr, i => ({
            fill: `rgb(255, 0, ${i})`
        }))

        expect((arr2.arr.value.at(0)! as any)._config).toEqual({
            "fill": "rgb(255, 0, 0)",
            "stroke": "",
            "width": 1,
            })
        expect((arr2.arr.value.at(1)! as any)._config).toEqual({
            "fill": "rgb(255, 0, 1)",
            "stroke": "",
            "width": 1,
            })
    })
})