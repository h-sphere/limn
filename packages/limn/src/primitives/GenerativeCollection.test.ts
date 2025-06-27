import { GenerativeCollection } from "./GenerativeCollection"
import { Point } from "./Point"

describe('Generative Collection', () => {
    it('should instantiate basic generative collection', () => {
        const factory = jest.fn((i) => new Point(i, i))
        const c = new GenerativeCollection(5, factory)
        expect(c.length).toEqual(5)
        // Lazy behaviour
        expect(factory).toHaveBeenCalledTimes(0)
        expect(c.items[0].xy).toEqual([0, 0])
        expect(factory).toHaveBeenCalledTimes(5)
        expect(c.items[4].xy).toEqual([4, 4])
    })

    it('should allow for regeneration when length changes', () => {
        const factory = jest.fn(i => new Point(i, i))
        const c = new GenerativeCollection(5, factory)
        c.length = 10
        expect(c.length).toEqual(10)
        expect(c.items.length).toEqual(10)
        c.length = 5
        expect(c.items.length).toEqual(5)
        expect(factory).toHaveBeenCalledTimes(15)
    })
})