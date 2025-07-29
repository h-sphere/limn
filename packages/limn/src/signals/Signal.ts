import { Atom, atom, isSignal, reactor, Reactor, RESET_VALUE, Signal } from "signia";

export class LimnSignal<Value> implements Atom<Value, unknown> {

    internalSignal: Atom<Value, unknown>
    reactor: Reactor<void> | null = null

    constructor(initial: Value | Signal<Value> | (() => Value)) {
        if (isSignal(initial)) {
            this.internalSignal = atom('', initial.value)
            this.linkReactor(initial)
        } else if (typeof initial === 'function') {
            const init = initial as () => Value
            this.internalSignal = atom('', init())
            this.linkReactor(init)
        } else {
            this.internalSignal = atom('', initial)
        }
    }

    set(value: Value | Signal<Value>, diff?: unknown): Value {
        if (isSignal(value)) {
            // Linking.
            return this.linkReactor(value)
        }
        return this.internalSignal.set(value, diff)
    }

    private linkReactor(value: Signal<Value> | (() => Value)) {
        if (this.reactor) {
            this.reactor.stop()
        }
        this.reactor = reactor('linking', () => {
            if (typeof value === 'function') {
                let v = value()
                requestAnimationFrame(() => this.set(v))
            } else {
                let v = value.value
                requestAnimationFrame(() => this.set(v))
            }
        })
        this.reactor.start()
        return this.value
    }

    update(_updater: (value: Value) => Value): Value {
        throw new Error("Method not implemented.");
    }

    get name() {
        return 'unnamed'
    }

    get value() {
        return this.internalSignal.value
    }

    set value(newValue: Value) {
        this.set(newValue)
    }

    get lastChangedEpoch() {
        return this.internalSignal.lastChangedEpoch
    }

    getDiffSince(_epoch: number): RESET_VALUE | unknown[] {
        throw new Error("Method not implemented.");
    }

    __unsafe__getWithoutCapture(): Value {
        throw new Error("Method not implemented.");
    }

}