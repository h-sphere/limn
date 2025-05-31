import { Color } from "../utils/configs";
import { RawColor } from "../utils/signalTypes";


export interface LimnFill {
    get fill(): string | RawColor
}