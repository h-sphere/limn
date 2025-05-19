import { computed } from "signia"
import { Circle } from "./Circle"
import { Point } from "./Point"

describe('Circle', () => {
    it('should properly create a circle', () => {
        const center = new Point(100, 100)
        const circle = new Circle(center, 20)
        expect(circle.center.xy).toEqual([100, 100])
        expect(circle.radius).toEqual(20)
        circle.radius = 50
        expect(circle.radius).toEqual(50)

        // radius is computed now
        const circle2 = new Circle(center, computed('description',
            () => 5
        ))
        expect(circle2.radius).toEqual(5)
        expect(() => circle2.radius = 100).toThrow('Cannot set value of a computed signal')
    })
})