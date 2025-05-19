import { Atom, atom, react, Signal } from "signia";
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
import { BBezierSpline } from "./BBezierSpline";
import { BCircle } from "./BCircle";
import { BCubicBezierCurve } from "./BCubicBezierCurve";
import { BLine } from "./BLine";
import { BPoint } from "./BPoint";
import { BPolygon } from "./BPolygon";
import { BRectangle } from "./BRectangle";
import { BristleContext, Renderable } from "./interfaces";
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

type CLASSES = typeof RENDER_CLASSES

type Inputs = CLASSES[number][0]

type ExtractOutput<Tuple, I> =
    Tuple extends readonly [infer First, infer Second]
    ? I extends First
    ? Second
    : never
    : never;


type Output<Input extends Inputs> =
    ExtractOutput<CLASSES[number], Input>;

type SecondConstructorArg<Input extends Inputs> =
    ConstructorParameters<Output<Input>>[1];

// type spl = Output<typeof BezierSpline>

// type out = SecondConstructorArg<typeof BezierSpline>

const isRenderable = (r: Object): r is Renderable => {
    if ('render' in r) {
        return true
    }
    return false
}

export class BristleRenderer {
    constructor(private readonly ctx: BristleContext, private readonly width: NumSig, private readonly height: NumSig) {
    }

    items: Atom<Renderable[]> = atom('Renderable.items', [])

    // add(...items: Renderable[]) {
    //     this.items.push(...items)
    // }

    add<const Item extends Inputs | Renderable>(
        item: Item extends Inputs ? InstanceType<Item> : Item,
        ...args: Item extends Inputs ? [SecondConstructorArg<Item>] : []
    ): Item extends Inputs ? Output<Item> : Item {
        if (isRenderable(item)) {
            this.items.set([...this.items.value, item])
        } else {
            // Implementation for converting Inputs to Renderable
            const inputType = item.constructor as Inputs;

            // Find the matching class pair in RENDER_CLASSES
            for (const [InputClass, OutputClass] of RENDER_CLASSES) {
                if (inputType === InputClass) {
                    // Create a new instance of the output class
                    // args[0] contains the config parameter
                    const renderable = new OutputClass(item as any, args[0]);
                    this.items.set([...this.items.value, renderable]);
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
            this.items.value.forEach(e => e.state.value)
            this.render()
        }, { scheduleEffect: schedule })
    }
}