import { atom, isSignal, Signal } from "signia"
import { Point } from "../primitives/Point"

export type NumSig = number | Signal<number>
export type PointSig = Point | [NumSig, NumSig]
export type PointSignal = PointSig | Signal<Point>
export type StringSig = string | Signal<string>


export type RawColor = CanvasFillStrokeStyles['fillStyle']

export type ColorOrSignal = string | Signal<string> // RawColor | Signal<RawColor>

export const toStringSig = (n: StringSig) => isSignal(n) ? n : atom('string', n)
export const str = (n: StringSig) => isSignal(n) ? n.value : n


export const toNumberSig = (n: NumSig) => isSignal(n) ? n : atom('tonumsig', n)

export const toPointSig = (p: PointSignal) => {
    if (isSignal(p)) {
        return p
    }
    if (Array.isArray(p)) {
        return atom('point', new Point(...p))
    }
    return atom('point', p)
}