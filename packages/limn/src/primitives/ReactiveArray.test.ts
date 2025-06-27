import { atom } from "signia"
import { ReactiveArray } from "./ReactiveArray"

describe('Reactive Array', () => {
    it('should properly instantiate reactive array', () => {
        const s = atom('arr', [1, 2, 3])
        const arr = new ReactiveArray(s)
        expect(arr.length).toEqual(3)
        const mapFn = jest.fn(i => 2 * i)
        const map = arr.map(mapFn)
        expect(mapFn).not.toHaveBeenCalled()
        expect(map.items).toEqual([2, 4, 6])
        expect(mapFn).toHaveBeenCalledTimes(3)

        // Filter
        const filtered = arr.filter(i => i % 2 === 0)
        expect(filtered.length).toEqual(1)
        expect(filtered.items).toEqual([2])

        // Now let's change underlying array
        mapFn.mockClear()
        s.set([5, 5, 5, 5])
        expect(mapFn).not.toHaveBeenCalled()
        expect(map.items).toEqual([10, 10, 10, 10])
        expect(map.length).toEqual(4)
        expect(mapFn).toHaveBeenCalledTimes(4)
        expect(map.get(3)).toEqual(10)
    })
})