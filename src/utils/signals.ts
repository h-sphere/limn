import { atom as a, computed as c, isSignal, Signal } from "signia";

export const atom = <T>(t: T) => a('untitled', t)
export const computed = <T>(t: () => T) => c('untitled', t)
export const value = <T>(t: T | Signal<T>) => isSignal(t) ? t.value : t