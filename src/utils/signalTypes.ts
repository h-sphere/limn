import { atom, computed, isSignal, Signal } from "signia"
import { Point } from "../primitives/Point"

export type NumSig = number | Signal<number>
export type PointSig = Point | [NumSig, NumSig]

export const toNumberSig = (n: NumSig) => isSignal(n) ? n : atom('tonumsig', n)