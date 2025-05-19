import { Point } from "./Point"

describe('Point', () => {
    it('should create point', () => {
        const p = new Point(10, 20)
        expect(p.x).toEqual(10)
        expect(p.y).toEqual(20)

        p.x = 20
        p.y = 40
        expect(p.x).toEqual(20)
        expect(p.y).toEqual(40)
        expect(p.xy).toEqual([20, 40])
        expect(p.yx).toEqual([40, 20])

        p.xy = [1, 2]
        expect(p.x).toEqual(1)
        expect(p.y).toEqual(2)

        p.yx = [10, 20]
        expect(p.xy).toEqual([20, 10])
    })

    it('should allow for add operation', () => {
        const p = new Point(10, 20)
        const p2 = p.add(20, 30)
        expect(p2.xy).toEqual([30, 50])
        p.x = 100
        expect(p2.x).toEqual(120)

        // with point
        const diffPoint = new Point(25, 15)
        const p3 = new Point(10, 100)
        const p4 = p3.add(diffPoint)
        expect(p4.xy).toEqual([35, 115])
        expect(p4.yx).toEqual([115, 35])
        expect(() => p4.x = 5).toThrow('Cannot set value of a computed signal')
        expect(() => p4.y = 5).toThrow('Cannot set value of a computed signal')
    })

    it('should properly transform point', () => {
        const p = new Point(10, 10)
        const protated = p.transform({ rotate: 90 * Math.PI / 180, origin: [0, 0 ] })
        expect(protated.xy).toEqual([10, -10])
    })
})