import { BaseShape } from "../utils/base";
import { NumSig, PointSig, StringSig } from "../utils/signalTypes";
import { Point } from "./Point";

interface TextConfig {
    text: StringSig,
    size?: NumSig,
    position: PointSig,
    anchor?: StringSig,
    // FIXME: add anchor position
}

export class Text extends BaseShape<TextConfig> {
    declare readonly text: string
    declare readonly size: number
    declare readonly position: Point
    declare readonly anchor: string

    protected defaults = { size: 16, anchor: 'top-left' }
}