import { isSignal } from "signia"
import { LimnSignal } from "./Signal"
import { Point } from "../limn"

type Constructable = new (...args: any) => any

export type AllowedValue = Number | String | Constructable

type InitParams<T extends Constructable> = T extends { init(T: infer K): InstanceType<T> } ? K : never

export type InputType<T extends AllowedValue> = T extends NumberConstructor ?
    number | LimnSignal<number>
: T extends StringConstructor ?
    string | LimnSignal<string>
:
T extends Constructable ?
    InstanceType<T> | LimnSignal<InstanceType<T>> | InitParams<T> //ConstructorParameters<T>[0]
: never

type ResolvedType<T extends AllowedValue> = T extends NumberConstructor ?
    /*number |*/ LimnSignal<number>
: T extends StringConstructor ?
    /*string |*/ LimnSignal<string>
:
T extends Constructable ?
    /*InstanceType<T>*/ | LimnSignal<InstanceType<T>> //| ConstructorParameters<T>[0]
: never

export type Config<Conf extends Record<string, AllowedValue>> = {
    [K in keyof Conf]: InputType<Conf[K]>
}

type Result<Conf extends Record<string, AllowedValue>> = {
    [K in keyof Conf]: ResolvedType<Conf[K]>

}

const isAllowedValueConstructable = (c: AllowedValue): c is Constructable => {
    return typeof c !== 'number' && typeof c !== 'string'
}

export const K = <const C extends Record<string, AllowedValue>>(c: C) => (conf: Config<C>): Result<C>  => {
    const entries = Object.entries(conf).map(([key, value]) => {
        console.log('kv', key, value)
        if (isSignal(value) || value instanceof LimnSignal) {
            return [key, value]
        }
        if (typeof value === 'number' || typeof value === 'string') {
            return [key, new LimnSignal(value)]
        }

        if (isAllowedValueConstructable(c[key]) && value instanceof c[key]) {
            return [key, new LimnSignal(value)]
        }

        if ('init' in c[key]) {
            // it needs to be an argument now.
            const Constructor = c[key] as any // FIXME: better typing here.
            return [key, new LimnSignal(Constructor.init(value))]
        }
        throw new Error(`Incorrect Value for key ${key}: ${value}`)
    })
    return Object.fromEntries(entries)
}

K({
    a: String,
    b: Point
})({
    a: 'dsada',
    b: new Point(2, 5)
})

export const signalConfig = <C extends Record<string, any>>(config: Config<C>): C => {
    return Object.fromEntries(
        Object.entries(config).map(([key, value]) => {
        if (isSignal(value)) {
            return [key, value]
        }
        return [key,value]
    })) as C
}