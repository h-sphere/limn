import { atom, isSignal, Signal } from "signia"
import { Point } from "../primitives/Point"
import { LimnFill } from "../fills/limnFill"

export type NumSig = number | Signal<number>
export type PointSig = Point | [NumSig, NumSig]
export type PointSignal = PointSig | Signal<Point>
export type StringSig = string | Signal<string>


export type RawColor = CanvasFillStrokeStyles['fillStyle']

export type ColorOrSignal = string | Signal<string> | RawColor | Signal<RawColor> | LimnFill | Signal<LimnFill>

const isLimnFill = (c: Object): c is LimnFill => {
    try { 
        return 'fill' in c
    } catch (e) {
        // FIXME: do it better?
        return false
    }
}

export const toStringSig = (n: StringSig) => isSignal(n) ? n : atom('string', n)
export const str = (n: StringSig) => isSignal(n) ? n.value : n

export const color = (c: ColorOrSignal): string | RawColor => {
    if (isLimnFill(c)) {
        return c.fill
    }
    if (isSignal(c)) {
        const v = c.value
        if (isLimnFill(v)) {
            return v.fill
        }
        return c.value as string | RawColor
    }
    return c
}


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