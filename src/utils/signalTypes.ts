import { Signal } from "signia"
import { Point } from "../primitives/Point"

export type NumSig = number | Signal<number>
export type PointSig = Point | [NumSig, NumSig]
