import { Atom, atom, computed, react } from "signia";
import { BezierSpline } from "../primitives/BezierSpline";
import { Circle } from "../primitives/Circle";
import { Line } from "../primitives/Line";
import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { ReactiveArray } from "../primitives/ReactiveArray";
import { Rectangle } from "../primitives/Rectangle";
import { RArray } from "./RArray";
import { RBezierSpline } from "./RBezierSpline";
import { RCircle } from "./RCircle";
import { RCubicBezierCurve } from "./RCubicBezierCurve";
import { RLine } from "./RLine";
import { RPoint } from "./RPoint";
import { BPolygon } from "./RPolygon";
import { RRectangle } from "./RRectangle";
import { LimnContext, PrimitiveRenderable, Renderable } from "./interfaces";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";
import { Timer } from "../timer/timer";
import { Arc } from "../primitives/Arc";
import { RArc } from "./RArc";

const RENDER_CLASSES = [
    [Point, RPoint],
    [Line, RLine],
    [ReactiveArray, RArray],
    [Polygon, BPolygon],
    [Circle, RCircle],
    [Rectangle, RRectangle],
    [CubicBezierCurve, RCubicBezierCurve],
    [BezierSpline, RBezierSpline],
    [Arc, RArc]
] as const

type VV = ExtractInstancePairs<typeof RENDER_CLASSES>[number]

type O<T extends VV[0]> = Extract<VV, readonly [T, any]>[1]

type MapPairToInstances<T extends readonly [any, any]> = 
  [InstanceType<T[0]>, InstanceType<T[1]>];

  type ExtractInstancePairs<T extends readonly (readonly [any, any])[]> = {
    [K in keyof T]: MapPairToInstances<T[K]>;
  };


type Config<T extends VV[0]> = O<T> extends PrimitiveRenderable<any, infer Config> ? [Partial<Config>] : []

type RR = VV[0] | Renderable
type OR<T extends RR> = T extends ReactiveArray<infer TT> ?
TT extends Renderable ?
RArray<TT> : TT extends VV[0] ? OR<TT> extends PrimitiveRenderable<any, any> ? RArray<OR<TT>> : never : never
:
T extends VV[0] ? O<T> : T

type ConfigR<T extends RR> = T extends ReactiveArray<infer TT> ?
    TT extends RR ?
    ConfigR<TT> : []
    : T extends VV[0] ? Config<T> : []

export const isArrayType = (item: RR): item is ReactiveArray<any> => {
    return (item instanceof ReactiveArray)
}

export const getWrapClass = (item: RR) => {
    for (const [InputClass, OutputClass] of RENDER_CLASSES) {
        if (item instanceof InputClass) {
            return OutputClass
        }
    }
    return null
}

const isRenderable = (r: object): r is PrimitiveRenderable<any, any> => {
    if ('render' in r) {
        return true
    }
    return false
}

export class LimnRenderer {
    _width: Atom<number> = atom('width', 0)
    _height: Atom<number> = atom('height', 0)
    constructor(private readonly ctx: LimnContext) {
        if (ctx.canvas) {
            this._width.set(ctx.canvas.width)
            this._height.set(ctx.canvas.height)
        }
    }

    #timer: Timer = new Timer()

    items: Atom<PrimitiveRenderable<any, any>[]> = atom('Renderable.items', [])

    @computed get size() {
        return new Point(this._width, this._height)
    }

    @computed get center() {
        return this.canvasRect.center
    }

    @computed get canvasRect() {
        return new Rectangle({ p1: new Point(0, 0), p2: this.size })
    }

    #mousePos: Point = new Point(0, 0)
    #isTrackingMousePos: boolean = false
    get mousePos() {
        if (!this.#isTrackingMousePos) {
            this.ctx.canvas.addEventListener('mousemove', (e: any) => {
                this.#mousePos.xy = [e.layerX, e.layerY]
            })
        }
        return this.#mousePos
    }

    fitScreen() {
        this.ctx.canvas.width = window.innerWidth
        this.ctx.canvas.height = window.innerHeight
        this._width.set(this.ctx.canvas.width)
        this._height.set(this.ctx.canvas.height)
        window.addEventListener('resize', () => {
            this.ctx.canvas.width = window.innerWidth
            this.ctx.canvas.height = window.innerHeight
            this._width.set(this.ctx.canvas.width)
            this._height.set(this.ctx.canvas.height)
        })
        return this
    }

    add<const Item extends RR>(
        item: Item,
        ...[config]: ConfigR<Item> 
    ): OR<Item> {
        if (isRenderable(item)) {
            this.items.set([...this.items.value, item])
        } else {
            // Implementation for converting Inputs to Renderable
            const inputType = item.constructor

            // FIXME: add case for Array
            if (isArrayType(item)) {
                const WrapClass = getWrapClass(item.get(0) as any)
                if (WrapClass !== null) {
                    const arr = new RArray(computed('v', () => item.map(i => new WrapClass(i as any, config as any))))
                    this.items.set([...this.items.value, arr as any])
                    return arr as OR<Item>
                }
            }

            // Find the matching class pair in RENDER_CLASSES
            for (const [InputClass, OutputClass] of RENDER_CLASSES) {
                if (inputType === InputClass) {
                    // Create a new instance of the output class
                    // args[0] contains the config parameter
                    const renderable = new OutputClass(item as any, config as any);
                    this.items.set([...this.items.value, renderable as any]);
                    return renderable as any;
                }
            }

            // If we get here, we couldn't find a matching renderer
            throw new Error(`No renderer found for input type: ${inputType.name}`);
        }
        return item as any
    }

    clear() {
        this.items.set([])
    }

    get timer() {
        return this.#timer
    }

    render() {
        // FIXME: maybe not clear everything
        const c = this.ctx
        this.items.value.forEach(item => item.render(c))
    }

    watch() {
        this.timer.start()
        let isScheduled = false
        let scheduledEffect = () => { }
        const schedule = (effect: () => void) => {
            scheduledEffect = effect
            if (isScheduled) {
                return
            }
            isScheduled = true;
            requestAnimationFrame(() => {
                effect()
                isScheduled = false
            })
        }
        // this.render()
        react('renderer.watch', () => {
            this.ctx.clearRect(0, 0, ...this.size.xy)
            this.render()
        }, { scheduleEffect: schedule })
    }
}