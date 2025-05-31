import { atom, computed, isSignal, Signal } from "signia";
import { ColorOrSignal, NumSig, str, StringSig } from "../utils/signalTypes";
import { LimnFill } from "./limnFill";
import { Color } from "../utils/configs";
import { LimnContext } from "../canvas/interfaces";
import { Circle, Rectangle } from "../limn";
import { num } from "../math/matrix";

interface Stop {
    value: NumSig,
    color: StringSig
}

type Stops = Array<Stop> | Signal<Array<Stop>>

interface RadialGradientConfig {
    c1: Signal<Circle> | Circle,
    c2: Signal<Circle> | Circle,
    stops: Stops,
    ctx: LimnContext
}

export class RadialGradient implements LimnFill {
    private configuration;
    private ctx
    constructor(conf: RadialGradientConfig) {
        const c1 = isSignal(conf.c1) ? conf.c1 : atom('c1', conf.c1)
        const c2 = isSignal(conf.c2) ? conf.c2 : atom('c2', conf.c2)
        const stops = isSignal(conf.stops) ? conf.stops : atom('stops', conf.stops)

        this.configuration = {
            c1,
            c2,
            stops
        }
        this.ctx = conf.ctx
    }
    @computed get fill(): CanvasGradient {
        const c1 = this.configuration.c1.value
        const c2 = this.configuration.c2.value
        const g = this.ctx.createRadialGradient(...c1.center.xy, c1.radius, ...c2.center.xy, c2.radius)
        this.configuration.stops.value.forEach(stop => {
            g.addColorStop(num(stop.value), str(stop.color))
        })
        return g
    }
}