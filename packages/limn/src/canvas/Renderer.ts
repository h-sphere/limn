import { Atom, atom, computed, react, Signal } from "signia";
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
import { ConfigOptions, ConfigOptionsArray, LimnContext, PrimitiveRenderable, Renderable } from "./interfaces";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";
import { Timer } from "../timer/timer";
import { Arc } from "../primitives/Arc";
import { RArc } from "./RArc";
import { Text } from "../primitives/Text";
import { RText } from "./RText";
import { Layer, RLayer } from "../limn";
import { RImage } from "./RImage";
import { LimnImage } from "../primitives/Image";
import { LimnVideo } from "../primitives/Video";
import { RVideo } from "./RVideo";
import { RPath } from "./RPath";
import { Path } from "../primitives/Path";
import { numberSignal } from "../signals/NumberSignal";
import { LimnSignal } from "../signals/Signal";


const throttle = <F extends (...args: Array<any>) => any>(fn: F, wait: number = 300): F => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number;
  return function (...args: unknown[]) {
    if (!inThrottle) {
      fn(...args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(...args)
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  } as F;
};

const RENDER_CLASSES = [
    [Point, RPoint],
    [Line, RLine],
    [ReactiveArray, RArray],
    [Polygon, BPolygon],
    [Circle, RCircle],
    [Rectangle, RRectangle],
    [CubicBezierCurve, RCubicBezierCurve],
    [BezierSpline, RBezierSpline],
    [Path, RPath],
    [Arc, RArc],
    [Text, RText],
    [LimnImage, RImage],
    [LimnVideo, RVideo]
] as const


type ExtractInstancePairs<T extends typeof RENDER_CLASSES> = {
    [K in keyof T]: [InstanceType<T[K][0]>, InstanceType<T[K][1]>];
};

type AvailableRenderers = ExtractInstancePairs<typeof RENDER_CLASSES>[number]

type AvailablePrimitives = AvailableRenderers[0]

type RendererConfig<T, Ar extends boolean = false> = 
    T extends Renderable ? never
    : T extends ReactiveArray<infer TT> ? RendererConfig<TT, true>
    : T extends AvailablePrimitives ? SecondConstParam<PrimitivesRenderer<T>, Ar>
    : never

type SecondConstParam<T, Ar extends boolean = false> = T extends PrimitiveRenderable<infer P, infer C> ? true extends Ar ? ConfigOptionsArray<C, P> : ConfigOptions<C, P> : never

// type VV = ExtractInstancePairs<typeof RENDER_CLASSES>[number]



// type O<T extends VV[0]> = Extract<VV, readonly [T, any]>[1]

type PrimitivesRenderer<P extends AvailablePrimitives> = Extract<AvailableRenderers, readonly [P, unknown]>[1]



// type Config<T extends VV[0]> = O<T> extends PrimitiveRenderable<any, infer Config> ? [config: Partial<Config>] : []

type RR = AvailablePrimitives | Renderable
// type OR<T extends RR> = T extends ReactiveArray<infer TT> ?
//     TT extends Renderable ?
//     RArray<TT> : TT extends VV[0] ? OR<TT> extends PrimitiveRenderable<any, any> ? RArray<OR<TT>> : never : never
//     :
//     T extends VV[0] ? O<T> : T

// type ConfigR<T extends RR> = T extends ReactiveArray<infer TT> ?
//     TT extends RR ?
//     (ConfigR<TT> | [(i: number) => ConfigR<TT>[0]]) : []
//     : T extends VV[0] ? Config<T> : []

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
    private _width: Atom<number> = atom('width', 0)
    private _height: Atom<number> = atom('height', 0)
    constructor(private readonly ctx: LimnContext) {
        if (ctx.canvas) {
            this._width.set(ctx.canvas.width)
            this._height.set(ctx.canvas.height)
        }
    }

    #timer: Timer = new Timer()

    items: Atom<PrimitiveRenderable<unknown, unknown>[]> = atom('Renderable.items', [])

    #topLeft = new LimnSignal(new Point(0, 0))
    #zoom = numberSignal(1)

    @computed get size() {
        return new Point(this._width, this._height)
    }

    @computed get center() {
        return this.canvasRect.center
    }

    @computed get zoom(): number {
        return this.#zoom.value
    }

    set zoom(v: number | Signal<number>) {
        this.#zoom.set(v)
    }

    @computed get topLeft(): Point {
        return this.#topLeft.value
    }

    set topLeft(v: Point | Signal<Point>) {
        this.#topLeft.set(v)
    }

    get context() {
        return this.ctx
    }

    @computed get minSize() {
        return Math.min(this.size.x, this.size.y)
    }

    @computed get maxSize() {
        return Math.max(this.size.x, this.size.y)
    }

    /**
     * Rectangle representing whole canvas area (from (0,0) to (w,h))
     */
    @computed get canvasRect() {
        return new Rectangle({ p1: new Point(0, 0), p2: this.size })
    }

    #mousePos: Point = new Point(0, 0)
    #isTrackingMousePos: boolean = false
    get mousePos() {
        if (!this.#isTrackingMousePos) {
            this.ctx.canvas.addEventListener('mousemove', (e: Event) => {
                if (e instanceof MouseEvent) {
                    this.#mousePos.xy = [e.layerX, e.layerY]
                }
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

    fitContainer() {
        // FIXME: observer

        const fn = throttle((entries: { target: Element }[]) => {
            const canvas = entries[0].target as HTMLCanvasElement
            const box = canvas.getBoundingClientRect()

            canvas.width = box.width
            canvas.height = box.height
            this._width.set(this.ctx.canvas.width)
            this._height.set(this.ctx.canvas.height)
        }, 100)

        const observer = new ResizeObserver(fn)
        observer.observe(this.ctx.canvas as Element)
        fn([{ target: this.ctx.canvas as Element }])
    }

    /**
     * Adds new item to render on canvas
     * @param item either Renderable or a basic shape
     * @param config configuration for the basic shape
     * @returns renderer added to the canvas. if renderable was passed, returns the same renderable. if not, returns renderable that wraps given object
     */
    add<const Item extends RR>(
        item: Item,
        ...[config]: [RendererConfig<Item>]
    ) /*OR<Item>*/ {
        if (isRenderable(item)) {
            this.items.set([...this.items.value, item])
            return item
        }

        // Implementation for converting Inputs to Renderable
        const inputType = item.constructor
        if (isArrayType(item)) {
            const firstItem = item.get(0) as RR
            const WrapClass = getWrapClass(firstItem)
            if (WrapClass === null) {
                return null
            }
            if (item instanceof Layer) {
                // FIXME: implement layer, not sure what's going on here.
                return null
            }
            if (item instanceof RArray) {
                return new RArray(computed('v', () => item.map((el, i: number) => {
                const conf = typeof config === 'function' ? (el: Item) => config(el as any, i) : config
                const res: any =  new (WrapClass as any)(el as any, conf) // FIXME: fix soon, issue with too complex expression for TS
                return res
            })))
            }
        }

            // FIXME: add case for Array
            if (isArrayType(item)) {
                const WrapClass = getWrapClass(item.get(0) as any)
                if (WrapClass !== null) {
                    let arr
                    if (item instanceof Layer) {
                        arr = new RLayer(item.map(e => {
                            // FIXME: union class is too complex.
                            const layer = new (WrapClass as any)(e as any, config as unknown) as any
                            return layer
                        }) as any) // FIXME: better typing here?
                    } else {
                        arr = new RArray(computed('v', () => item.map((el, i) => {
                            // FIXME: union class is too complex to compute, fix this.
                            const layer = new (WrapClass as any)(
                                el as any,
                                typeof config === 'function' ? config(el as any, i as any) : config
                            ) as any
                            return layer
                    })
                    )
                )
                    }
                    this.items.set([...this.items.value, arr as any])
                    return arr
                }
            }

            // Find the matching class pair in RENDER_CLASSES
            for (const [InputClass, OutputClass] of RENDER_CLASSES) {
                if (inputType === InputClass) {
                    // Create a new instance of the output class
                    // args[0] contains the config parameter

                    // FIXME: union class is too complex - to be fixed.
                    const renderable: any = new (OutputClass as any)(item as any, config as any) as any;
                    this.items.set([...this.items.value, renderable as any]);
                    return renderable as any;
                }
            }

            // If we get here, we couldn't find a matching renderer
            throw new Error(`No renderer found for input type: ${inputType.name}`);
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

        c.save()
        c.translate(this.center.x, this.center.y)
        c.scale(this.zoom, this.zoom)
        c.translate(-this.center.x + this.topLeft.x, -this.center.y + this.topLeft.y)

        this.items.value.forEach(item => item.render(c))

        this.context.restore()
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
                scheduledEffect()
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