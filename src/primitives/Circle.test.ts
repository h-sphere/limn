import { Circle } from "./Circle"
import { Point } from "./Point"

describe('Circle', () => {
    it('should properly create a circle', () => {
        const center = new Point(100, 100)
        const circle = new Circle({ center, radius: 20 })
        expect(circle.center.xy).toEqual([100, 100])
        expect(circle.radius).toEqual(20)
    })
})