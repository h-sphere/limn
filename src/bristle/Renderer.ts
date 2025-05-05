import { num } from "../math/matrix";
import { Circle } from "../primitives/Circle";
import { Line } from "../primitives/Line";
import { Point } from "../primitives/Point";
import { Polygon } from "../primitives/Polygon";
import { ReactiveArray } from "../primitives/ReactiveArray";
import { Rectangle } from "../primitives/Rectangle";
import { NumSig } from "../utils/signalTypes";
import { BArray } from "./BArray";
import { BCircle } from "./BCircle";
import { BLine } from "./BLine";
import { BPoint } from "./BPoint";
import { BPolygon } from "./BPolygon";
import { BRectangle } from "./BRectangle";
import { BristleContext, Renderable } from "./interfaces";

const RENDER_CLASSES = [
    [Point, BPoint],
    [Line, BLine],
    [ReactiveArray, BArray],
    [Polygon, BPolygon],
    [Circle, BCircle],
    [Rectangle, BRectangle],
    
] as const

type CLASSES = typeof RENDER_CLASSES

type Inputs = CLASSES[number][0]

type ExtractOutput<Tuple, I> =
    Tuple extends readonly [infer First, infer Second]
    ? First extends I
    ? Second
    : never
    : never;

type Output<Input extends Inputs> =
    ExtractOutput<CLASSES[number], Input>;

type SecondConstructorArg<Input extends Inputs> =
    ConstructorParameters<Output<Input>>[1];


const isRenderable = (r: Object): r is Renderable => {
    if ('render' in r) {
        return true
    }
    return false
}

export class BristleRenderer {
    constructor(private readonly ctx: BristleContext, private readonly width: NumSig, private readonly height: NumSig) {
    }

    items: Renderable[] = []

    // add(...items: Renderable[]) {
    //     this.items.push(...items)
    // }


    add<Item extends Renderable | Inputs>(
        item: Item extends Inputs ? InstanceType<Item> : Item,
        ...args: Item extends Renderable ? [] : [SecondConstructorArg<Extract<Item, Inputs>>]
    ) {
        if (isRenderable(item)) {
            this.items.push(item)
        } else {
            // Implementation for converting Inputs to Renderable
            const inputType = item.constructor as Inputs;

            // Find the matching class pair in RENDER_CLASSES
            for (const [InputClass, OutputClass] of RENDER_CLASSES) {
                if (inputType === InputClass) {
                    // Create a new instance of the output class
                    // args[0] contains the config parameter
                    const renderable = new OutputClass(item as any, args[0]);
                    this.items.push(renderable);
                    return;
                }
            }

            // If we get here, we couldn't find a matching renderer
            throw new Error(`No renderer found for input type: ${inputType.name}`);
        }
    }

    render() {
        // FIXME: maybe not clear everything
        const c = this.ctx
        c.clearRect(0, 0, num(this.width), num(this.height))
        this.items.forEach(item => item.render(c))
    }
}