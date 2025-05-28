import { atom } from "signia"
import { Arc } from "./Arc"

describe('Arc', () => {
    it('should properly instantiate arc with primitives', () => {
        const arc = new Arc({
            center: [0, 0],
            radius: 5,
            start: 0.1,
            end: 0.5
        })
        expect(arc.center.xy).toEqual([0, 0])
        expect(arc.radius).toEqual(5)
        expect(arc.start).toBeCloseTo(0.1)
        expect(arc.end).toBeCloseTo(0.5)
    })

    it('should properly use defaults', () => {
        const arc = new Arc({
            center: [5, 5],
            radius: 10
        })

        expect(arc.start).toEqual(0)
        expect(arc.end).toEqual(1)
    })

    it('should properly use .with method', () => {
        const arc = new Arc({
            center: [0, 0],
            radius: 5,
            start: 0.1
        }).with({ center: [5, 5]})

        expect(arc.center.xy).toEqual([5, 5])
        expect(arc.radius).toEqual(5)
        expect(arc.start).toBeCloseTo(0.1)
    })

    it('should properly use .with method with function parameter', () => {
        const arc = new Arc({
            center: [5, 5],
            radius: 10,
            start: 0.1
        }).with((a) => ({
            center: a.center.add(50, 50),
            radius: 50
        }))
        expect(arc.center.xy).toEqual([55, 55])
        expect(arc.start).toEqual(0.1)
        expect(arc.radius).toEqual(50)
        expect(arc.end).toEqual(1)
    })

    it('should properly update values when signals change', () => {
        const sig = atom('signal', 0)
        const arc = new Arc({
            center: [5, 5],
            radius: 15,
            start: 0
        }).with(a => ({
            center: a.center.add(sig.value, 0),
            radius: a.radius + sig.value // because it's part of the closure, it will get updated
        }))

        expect(arc.center.xy).toEqual([5, 5])
        expect(arc.radius).toEqual(15)
        sig.set(55)
        expect(arc.center.xy).toEqual([60, 5])
        expect(arc.radius).toEqual(70)
    })
})