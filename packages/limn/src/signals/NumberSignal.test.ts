import { numberSignal } from './NumberSignal'

describe('NumberSignal', () => {
    it('should properly instantiate number signals and perform basic operations', () => {
        const a = numberSignal(5)
        const b = numberSignal(100)
        const c = numberSignal(() => a.value + b.value)

        expect(a.value).toEqual(5)
        expect(b.value).toEqual(100)
        expect(c.value).toEqual(105)

        // a.value = 47
        // expect(c.value).toEqual(147)
    })
})