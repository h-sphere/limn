import { Point } from "./Point"

describe('Point', () => {
    it('should create point', () => {
        const p = new Point(10, 20)
        expect(p.x).toEqual(10)
        expect(p.y).toEqual(20)

        // p.x = 20
        // p.y = 40
        // expect(p.x).toEqual(20)
        // expect(p.y).toEqual(40)
        // expect(p.xy).toEqual([20, 40])
        // expect(p.yx).toEqual([40, 20])

        // p.xy = [1, 2]
        // expect(p.x).toEqual(1)
        // expect(p.y).toEqual(2)

        // p.yx = [10, 20]
        // expect(p.xy).toEqual([20, 10])
    })

    it('should allow for add operation', () => {
        const p = new Point(10, 20)
        const p2 = p.add(20, 30)
        expect(p2.xy).toEqual([30, 50])
        // p.x = 100
        // expect(p2.x).toEqual(120)

        // with point
        const diffPoint = new Point(25, 15)
        const p3 = new Point(10, 100)
        const p4 = p3.add(diffPoint)
        expect(p4.xy).toEqual([35, 115])
        expect(p4.yx).toEqual([115, 35])
        // expect(() => p4.x = 5).toThrow('Cannot set value of a computed signal')
        // expect(() => p4.y = 5).toThrow('Cannot set value of a computed signal')
    })

    it('should properly transform point', () => {
        const p = new Point(10, 10)
        const protated = p.transform({ rotate: 90 * Math.PI / 180, origin: [0, 0 ] })
        expect(protated.xy).toEqual([10, -10])
    })

    it('should properly scale point', () => {
        const p = new Point(10, 20)
        const pscaled = p.transform({ scale: 2 })
        expect(pscaled.xy).toEqual([20, 40])
    })

    it('should properly scale from the same point (no difference)', () => {
        const p = new Point(20, 50)
        const pscaled = p.transform({ scale: 2, origin: p })
        expect(pscaled.xy).toEqual([20, 50])
    })

    it('should properly translate the point', () => {
        const p = new Point(20, 50)
        const ptranslated = p.transform({ translate: [50, 50]})
        expect(ptranslated.xy).toEqual([70, 100])
    })

    it('should create invalid points', () => {
        const p1 = new Point(0, Infinity)
        expect(p1.isValid).toBeFalsy()

        const p2 = new Point(-Infinity, Infinity)
        expect(p2.isValid).toBeFalsy()

        const p3 = new Point(Infinity, Infinity)
        expect(p3.isValid).toBeFalsy()

        const p4 = new Point(5, 5)
        expect(p4.isValid).toBeTruthy()
    })

    it('should properly compute dot product', () => {
        const p1 = new Point(1, 1)
        const p2 = new Point(-2, 2)
        expect(p1.dot(p2)).toEqual(0)

        // const rot = 0.134321
        // // should also work when both of them are rotated
        // const p3 = p1.transform({
        //     rotate: rot
        // })

        // const p4 = p2.transform({
        //     rotate: rot
        // })

        // expect(p3.dot(p4)).toEqual(0)
    })
})