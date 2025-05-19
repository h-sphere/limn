import { Line } from "./Line"
import { Point } from "./Point"

describe('Line', () => {
    it('should create line', () => {
        const p1 = new Point(10, 10)
        const p2 = new Point(20, 20)
        const line = new Line(p1, p2)
        expect(line.p1.xy).toEqual([10, 10])
        expect(line.p2.xy).toEqual([20, 20])
        expect(line.center.xy).toEqual([15, 15])
        expect(line.length).toBeCloseTo(14.14)
    })

    it('should create parallel line', () => {
        const p1 = new Point(50, 50)
        const p2 = p1.add(100, 0)
        const line = new Line(p1, p2)
        expect(line.center.xy).toEqual([100, 50])
        expect(line.length).toEqual(100)
        expect(line.lerp(0.5).x).toEqual(line.center.x)
        expect(line.lerp(0).x).toEqual(line.p1.x)
        expect(line.lerp(1).x).toEqual(line.p2.x)

        const line2 = new Line(p1, p1.add(0, 100))
        expect(line2.lerp(0.5).y).toEqual(line2.center.y)
    })
})