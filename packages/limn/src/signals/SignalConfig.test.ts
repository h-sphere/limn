import { Circle, Point, Rectangle } from '../limn'
import { LimnSignal } from './Signal'
import { K } from './SignalConfig'

describe('Signal Config', () => {
    it('should properly instantiate signal config with basic config', () => {
        const conf = K({
            a: String,
            b: Number
        })

        const val = conf({
            a: 'dsadas',
            b: 432
        })

        console.log(val)

        expect(val.a).toBeInstanceOf(LimnSignal)
        expect(val.b).toBeInstanceOf(LimnSignal)
        expect(val.a.value).toEqual('dsadas')
        expect(val.b.value).toEqual(432)
    })

    it('should properly instantiate signal based on point', () => {
        const conf = K({
            p1: Point,
            p2: Point
        })

        const res = conf({
            p1: new Point(2, 5),
            p2: new Point(4, 4)
        })

        expect(res.p1).toBeInstanceOf(LimnSignal)
        expect(res.p2).toBeInstanceOf(LimnSignal)
        expect(res.p1.value).toBeInstanceOf(Point)
        expect(res.p1.value.xy).toEqual([2, 5])
        expect(res.p2.value.xy).toEqual([4, 4])

        // Also it should work with init
        const res2 = conf({
            p1: [1, 2],
            p2: { x: 3, y: 453 }
        })

        expect(res2.p1).toBeInstanceOf(LimnSignal)
        expect(res2.p1.value).toBeInstanceOf(Point)
        expect(res2.p1.value.xy).toEqual([1, 2])
        expect(res2.p2).toBeInstanceOf(LimnSignal)
        expect(res2.p2.value).toBeInstanceOf(Point)
        expect(res2.p2.value.xy).toEqual([3, 453])
    })

    it('should properly instantiate rect config', () => {
        const conf = K({
            rect: Rectangle
        })

        const res = conf({
            rect: {
                p1: [1, 2],
                p2: [3, 4]
            }
        })

        expect(res.rect.value).toBeInstanceOf(Rectangle)
        expect(res.rect.value.p1.xy).toEqual([1, 2])
        expect(res.rect.value.p2.xy).toEqual([3, 4])
    })

    it('should properly instantiate circle config', () => {
        const conf = K({
            c: Circle
        })

        const res = conf({
            c: {
                radius: 5,
                center: [5, 2]
            }
        })

        expect(res.c.value).toBeInstanceOf(Circle)
        expect(res.c.value.radius).toEqual(5)
        expect(res.c.value.center.xy).toEqual([5, 2])
    })

    it('should properly link singals', () => {
        const conf = K({
            p: Point
        })

        const point = new LimnSignal(Point.init({ x: 4, y: 1 }))

        const res = conf({
            p: point
        })

        expect(res.p).toEqual(point)

        // changing underlying signal
        point.value = new Point(5, 6)
        expect(res.p.value.xy).toEqual([5,6])
    })
})