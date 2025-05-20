import { Atom, atom, computed, react } from "signia";
import { num } from "../math/matrix";
import { BezierSpline } from "../primitives/BezierSpline";
import { Circle } from "../primitives/Circle";
import { Line } from "../primitives/Line";
import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { ReactiveArray } from "../primitives/ReactiveArray";
import { Rectangle } from "../primitives/Rectangle";
import { NumSig } from "../utils/signalTypes";
import { BArray } from "./BArray";
import { BBezierSpline, BBezierSplineConfig } from "./BBezierSpline";
import { BCircle, BCircleConfig } from "./BCircle";
import { BCubicBezierCurve, BCurveConfig } from "./BCubicBezierCurve";
import { BLine, BLineConfig } from "./BLine";
import { BPoint, BPointConfig } from "./BPoint";
import { BPolygon, BPolygonConfig } from "./BPolygon";
import { BRectangle, BRectangleConfig } from "./BRectangle";
import { BristleContext, PrimitiveRenderable, Renderable } from "./interfaces";
import { CubicBezierCurve } from "../primitives/CubicBezierCurve";

const RENDER_CLASSES = [
    [Point, BPoint],
    [Line, BLine],
    [ReactiveArray, BArray],
    [Polygon, BPolygon],
    [Circle, BCircle],
    [Rectangle, BRectangle],
    [CubicBezierCurve, BCubicBezierCurve],
    [BezierSpline, BBezierSpline]
] as const

type Configs = [
    [Point, BPointConfig],
    [Line, BLineConfig],
    [Polygon, BPolygonConfig],
    [ReactiveArray<any>, never],
    [Polygon, BPolygonConfig],
    [Circle, BCircleConfig],
    [Rectangle, BRectangleConfig],
    [CubicBezierCurve, BCurveConfig],
    [BezierSpline, BBezierSplineConfig]
]

type Inputs = Configs[number][0]

type GetConfig<T extends Inputs> =
    Extract<Configs, [T, any]>[1]

type ConfigClass<T> = T extends ReactiveArray<infer K> ? ConfigClass<K> : Extract<Configs[number], [T, any]>

type x = ConfigClass<Point>

type V = (typeof RENDER_CLASSES)[number]
type VV = ExtractInstancePairs<typeof RENDER_CLASSES>[number]

type O<T extends VV[0]> = Extract<VV, readonly [T, any]>[1]

type MapPairToInstances<T extends readonly [any, any]> = 
  [InstanceType<T[0]>, InstanceType<T[1]>];

  type ExtractInstancePairs<T extends readonly (readonly [any, any])[]> = {
    [K in keyof T]: MapPairToInstances<T[K]>;
  };

  type P<T> = T extends new (...args: any) => any ? T : never

  type ConstructorType<T> = new (...args: any[]) => T;

  export type List<A = any> = ReadonlyArray<A>
  export type Class<P extends List = any[], R extends object = object> = {
    new (...args: P): R
}
  export type Parameters<C extends Class> =
    C extends Class<infer P, any>
    ? P
    : never



  const p = new Line(new Point(0, 0), new Point(0, 0))
//   const p = new Point(0, 0)
  type AAA = O<typeof p>

  type B = AAA extends PrimitiveRenderable<any, infer Config> ? Config : never

//   type ABC = Parameters<typeof p>[1]

type XXXXXX = O<typeof p> extends PrimitiveRenderable<any, infer Config> ? Config : never

type Config<T extends VV[0]> = O<T> extends PrimitiveRenderable<any, infer Config> ? [Config] : []

// type A = ExtractInstancePairs<[[typeof Point, typeof Point]]>

// type xx = O<typeof Point>

// const p = new Point(0, 0)
// type A = O<typeof p>

type RR = VV[0] | Renderable
type OR<T extends RR> = T extends ReactiveArray<infer TT> ?
TT extends Renderable ?
BArray<TT> : TT extends VV[0] ? OR<TT> extends PrimitiveRenderable<any, any> ? BArray<OR<TT>> : never : never
:
T extends VV[0] ? O<T> : T

type ConfigR<T extends RR> = T extends ReactiveArray<infer TT> ?
    TT extends RR ?
    ConfigR<TT> : []
    : T extends VV[0] ? Config<T> : []

const fn = <const T extends RR>(a: T, ...[config]: ConfigR<T>): OR<T> => {
    return { } as any
}

const line = new BLine(p, { })

const arr2 = new ReactiveArray([new Point(0, 0), new Point(1, 1)])

const xxxx = fn(arr2, { color: 'red', width: 2 })

const dfsad = fn(p, {
    color: 'red',
    width: 3
})

const arr = new ReactiveArray([new Point(0, 0), new Point(1, 2)])

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

// type CLASSES = typeof RENDER_CLASSES

// type III = { [k: CLASSES[number][0]] : Object }

// type Inputs = InstanceType<CLASSES[number][0]>
// type Outputs = CLASSES[number][1]

// type GetRow<I extends Inputs> = CLASSES extends readonly [infer A, infer B] ?
//     B
//     : never

// type R = GetRow<Rectangle>


// type CLASSES = RENDER_CLASSES[number]

// type Inputs = CLASSES[0]

// type Output<Tuple, I> =
//     Tuple extends readonly [infer First, infer Second]
//     ? I extends First
//     ? Second
//     : Object
//     : Object;

// type SecondConstructorArg<I> =
//     CLASSES extends readonly [infer First, infer Second]
//     ? First extends I
//     ? typeof Second extends abstract new (...args: any) => any ? ConstructorParameters<Second>
//     : never
//     : never
//     : never;


// type SecondConstructorArg<Input extends Inputs> =
//     ConstructorParameters<typeof Output<Input>>[1];

// type Y = SecondConstructorArg<Point>

// type spl = Output<typeof BezierSpline>

// type out = SecondConstructorArg<typeof BezierSpline>

const isRenderable = (r: Object): r is PrimitiveRenderable<any, any> => {
    if ('render' in r) {
        return true
    }
    return false
}

export class BristleRenderer {
    constructor(private readonly ctx: BristleContext, private readonly width: NumSig, private readonly height: NumSig) {
    }

    items: Atom<PrimitiveRenderable<any, any>[]> = atom('Renderable.items', [])

    // add(...items: Renderable[]) {
    //     this.items.push(...items)
    // }

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
                const WrapClass = getWrapClass(item)
                if (WrapClass !== null) {
                    const items = new ReactiveArray(computed('items', () => item.items.map(i => new WrapClass(i as any, config as any))))
                    return new BArray(items as any) as OR<Item>
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

    render() {
        // FIXME: maybe not clear everything
        const c = this.ctx
        c.clearRect(0, 0, num(this.width), num(this.height))
        this.items.value.forEach(item => item.render(c))
    }

    watch() {
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
            this.render()
        }, { scheduleEffect: schedule })
    }
}