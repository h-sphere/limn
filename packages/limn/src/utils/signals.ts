import { atom as a, computed as c, isSignal, Signal } from "signia";
import { NumSig, toNumberSig, toPointSig, toStringSig } from "./signalTypes";
import { Point } from "../primitives/Point";

export const atom = <T>(t: T) => a('untitled', t)
export const computed = <T>(t: () => T) => c('untitled', t)
export const value = <T>(t: T | Signal<T>) => isSignal(t) ? t.value : t




type SignalOf<T> = T extends Signal<infer J> ? Signal<J> : never

const isTupple = (v: Array<any>): v is [NumSig, NumSig] => {
    return v.length === 2
}

export type ConfigToSignal<Conf> = {
    [K in keyof Conf]: SignalOf<Conf[K]>
}



const toSignal = <T>(v: T) => {
    if (isSignal(v)) {
        return v
    }
    if (typeof v === 'number') {
        return toNumberSig(v)
    }
    if (v instanceof Point) {
        return toPointSig(v)
    }
    if (typeof v === 'string') {
        return toStringSig(v)
    }
    if (Array.isArray(v) && isTupple(v)) {
        return toPointSig(v)
    }

    // FIXME: array of points
    if (Array.isArray(v)) {
        return atom(v)
    }
    console.error('invalid data', v)
    throw new Error('Invalid data')
}

export const configToInternal = <C>(conf: C): ConfigToSignal<C> => {
    return Object.fromEntries(Object.entries(conf as any).map(([key, value]) => {
        return [key, toSignal(value)]
    })) as unknown as ConfigToSignal<C>
}
