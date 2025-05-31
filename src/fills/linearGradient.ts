import { atom, computed, isSignal, Signal } from "signia";
import { ColorOrSignal, NumSig, str, StringSig } from "../utils/signalTypes";
import { LimnFill } from "./limnFill";
import { Color } from "../utils/configs";
import { LimnContext } from "../canvas/interfaces";
import { Rectangle } from "../limn";
import { num } from "../math/matrix";

interface Stop {
    value: NumSig,
    color: StringSig
}

type Stops = Array<Stop> | Signal<Array<Stop>>

interface LinearGradientConfig {
    bounds: Signal<Rectangle> | Rectangle,
    stops: Stops,
    ctx: LimnContext
}

export class LinearGradient implements LimnFill {
    private configuration;
    private ctx
    constructor(conf: LinearGradientConfig) {
        const rect = isSignal(conf.bounds) ? conf.bounds : atom('bounds', conf.bounds)
        const stops = isSignal(conf.stops) ? conf.stops : atom('stops', conf.stops)

        this.configuration = {
            bounds: rect,
            stops: stops
        }
        this.ctx = conf.ctx
    }
    @computed get fill(): CanvasGradient {
        const bounds = this.configuration.bounds.value
        const g = this.ctx.createLinearGradient(...bounds.p1.xy, ...bounds.p2.xy)
        this.configuration.stops.value.forEach(stop => {
            g.addColorStop(num(stop.value), str(stop.color))
        })
        return g
    }
}