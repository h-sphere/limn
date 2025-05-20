import { Atom, atom, computed, Signal } from "signia";

export class Timer {
    #currentTime: Atom<number> = atom('time', 0)
    #startTick: number = 0
    #isRunning: boolean = false
    constructor() {

    }

    @computed get currentTime() {
        return this.#currentTime.value
    }

    start() {
        if (this.#isRunning) {
            throw new Error('Timer already running')
        }
        this.#isRunning = true
        this.#startTick = Date.now()
        this.tick()
    }

    tick() {
        if (!this.#isRunning) {
            return
        }
        this.#currentTime.set(Date.now() - this.#startTick)
        requestAnimationFrame(() => this.tick())
    }

    stop() {
        this.#startTick = 0
        this.#isRunning = false
    }

    pause() {
        this.#isRunning = false
    }

    for<T>(ms: number, fn: (i: number) => Signal<T>): Signal<T> {
        const start = this.currentTime
        return computed(`for ${ms}ms`, () => {
            const t = Math.min(1, (this.currentTime - start) / ms)
            return fn(t).value
        })
    }
    get isRunning() {
        return this.#isRunning
    }

    infinite<T>(ms: number, fn: (i: number) => T): Signal<T> {
        const start = this.currentTime
        return computed(`infinite ${ms}ms`, () => {
            let t = (this.currentTime - start) / ms
            if (Math.floor(t) % 2 === 1) {
                t = 1 - (t % 1)
            } else {
                t = t % 1
            }
            return fn(t)
        })
    }

    infiniteForward<T>(ms: number, fn: (i: number) => T): Signal<T> {
        const start = this.currentTime
        return computed(`infinite ${ms}ms`, () => {
            const t = (this.currentTime - start) / ms
            return fn(t % 1)
        })
    }
    
}