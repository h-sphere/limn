import { BaseShape } from "../utils/base";
import { NumSig, PointSig, StringSig } from "../utils/signalTypes";
import { Point } from "./Point";

interface TextConfig {
    text: StringSig,
    size?: NumSig,
    position: PointSig,
    anchor?: StringSig,
    width?: NumSig
    // FIXME: add anchor position
}

export class Text extends BaseShape<TextConfig> {
    declare readonly text: string
    declare readonly size: number
    declare readonly position: Point
    declare readonly anchor: string
    declare readonly width: number

    protected defaults = { size: 16, anchor: 'bottom-left', width: 0 }
}