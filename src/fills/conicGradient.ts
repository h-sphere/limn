import { atom, computed, isSignal, Signal } from "signia";
import { NumSig, PointSignal, str, StringSig, toPointSig } from "../utils/signalTypes";
import { LimnFill } from "./limnFill";
import { LimnContext } from "../canvas/interfaces";
import { num } from "../math/matrix";

interface Stop {
    value: NumSig,
    color: StringSig
}

type Stops = Array<Stop> | Signal<Array<Stop>>

interface ConicGradientConfig {
    center: PointSignal,
    angle: NumSig,
    ctx: LimnContext
    stops: Stops
}

export class ConicGradient implements LimnFill {
    private configuration;
    private ctx
    constructor(conf: ConicGradientConfig) {
        const center = toPointSig(conf.center)
        const angle = isSignal(conf.angle) ? conf.angle : atom('angle', conf.angle)
        const stops = isSignal(conf.stops) ? conf.stops : atom('stops', conf.stops)

        this.configuration = {
            center,
            angle,
            stops
        }
        this.ctx = conf.ctx
    }
    @computed get fill(): CanvasGradient {
        const center = this.configuration.center.value
        const angle = this.configuration.angle.value
        const g = this.ctx.createConicGradient(angle, ...center.xy)
        this.configuration.stops.value.forEach(stop => {
            g.addColorStop(num(stop.value), str(stop.color))
        })
        return g
    }
}