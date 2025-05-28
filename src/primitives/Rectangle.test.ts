import { Point } from "./Point"
import { Rectangle } from "./Rectangle"

describe('Rectangle', () => {
    it('should properly instantiate rect', () => {
        const p1 = new Point(100, 100)
        const p2 = new Point(150, 150)
        const rect = new Rectangle({ p1, p2 })
        expect(rect.p1.xy).toEqual([100, 100])
        expect(rect.p2.xy).toEqual([150, 150])
        expect(rect.size.xy).toEqual([50, 50])
        expect(rect.center.xy).toEqual([125, 125])
    })
})