import { Circle } from "../src/primitives/Circle"
import { GenerativeCollection } from "../src/primitives/GenerativeCollection"
import { Line } from "../src/primitives/Line"
import { Point } from "../src/primitives/Point"
import { Rectangle } from "../src/primitives/Rectangle"
import { Polygon } from "../src/primitives/Polygon"
import { CubicBezierCurve } from "../src/primitives/CubicBezierCurve"
import { computed, ConicGradient, Layer, LimnRenderer, LinearGradient, RadialGradient, RCircle, ReactiveArray, Text } from '../src/limn'
import { RPoint } from "../src/canvas/RPoint"
import { atom, react } from "signia"

export const getStarted = (r: LimnRenderer) => {
    const t = r.timer.infinite(500, i => 5 + i * 20)
    const angle = r.timer.infiniteForward(2000, i => i * 2 * Math.PI)

    const p = r.center.add(100, 0).transform({
        rotate: angle,
        origin: r.center
    })
    const n = 10
    const c = new GenerativeCollection(n, i =>
        new Circle({
            center:  new Line(p, r.center).lerp(i / n),
            radius: computed(() => t.value + i * 20)
        })
    )
    r.add(c, {
        width: 2,
        stroke: 'red'
    })
}

export const pointAbsolute = (r: LimnRenderer) => {
    const p = new Point(50, 50)
    r.add(p, {
        color: 'red',
        radius: 10
    })
}

export const pointCenter = (r: LimnRenderer) => {
    r.add(r.center, {
        color: 'red',
        radius: 10
    })
}

export const line = (r: LimnRenderer) => {
    const l = new Line(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        color: 'red',
        width: 1
    })
}

export const rect = (r: LimnRenderer) => {
    const l = new Rectangle({ p1: new Point(10, 10),p2: new Point(50, 50)})
    r.add(l, {
        stroke: 'red',
        width: 1
    })
}

export const circle = (r: LimnRenderer) => {
    const c = new Circle({ center: r.center, radius: 50})
    r.add(c, {
        stroke: 'red',
        width: 1
    })
}

export const polygon = (r: LimnRenderer) => {
    const p = new Polygon({ center: r.center, n: 6, radius: 50 })
    r.add(p, {
        stroke: 'red',
        width: 1
    })
}

export const polygonAnimate = (r: LimnRenderer) => {
    const sides = r.timer.infinite(4000, i => 3 + Math.floor(i * 12))

    const polygon = new Polygon({
        center: r.center,
        n: sides,
        radius: 100
    })

    r.add(polygon, {
        stroke: 'red',
        width: 5
    })

    const text = new Text({
        text: computed(() => sides.value.toString()),
        position: r.center,
        size: 20,
        anchor: 'center-center'
    })
    r.add(text, {
        color: 'red'
    })
}

export const polygonEdges = (r: LimnRenderer) => {
    const rotation = r.timer.infiniteForward(4000, i => 2 * Math.PI * i)
    const polygon = new Polygon({
        center: r.center,
        n: 6,
        radius: 100
    })

    r.add(polygon, { stroke: 'rgb(100 100 100)', width: 2 })

    const edges = polygon.edges.map(e =>
        // rotating each edge around it's center
        e.transform({
            rotate: rotation,
            origin: e.center
        })
    )

    r.add(edges, {
        color: 'red',
        width: 3
    })
}

export const bezier = (r: LimnRenderer) => {
    const c = r.center
    const p = new CubicBezierCurve(
        c.add(-50, 0),
        c.add(50, 0),
        c.add(0, -25),
        c.add(0, 25)
    )
    r.add(p, {
        color: 'red',
        width: 1
    })
}

export const interactivityBasic = (r: LimnRenderer) => {
    const p = r.mousePos
    r.add(p, {
        color: 'red',
        radius: 10
    })
}

export const interactivityAdvanced = (r: LimnRenderer) => {
    const p = r.mousePos
    const maxSize = computed(() => Math.max(...r.size.xy))

    const nGon = new Polygon({ center: r.center, n:31, radius: maxSize })
    r.add(nGon.points.map(np => new Line(p, np)), {
        width: 1,
        color: 'red'
    })

    // concentric circles from the point
    const gen = new GenerativeCollection(
        10,
        i => new Circle({
            center: p,
            radius: 21 + i * i * 10 - 10 * Math.abs(p.x / r.size.x)
        })
    )

    r.add(gen, {
        width: 1,
        stroke: 'red'
    })

}

export const timer = (r: LimnRenderer) => {
    const timer = r.timer
    const x = timer.infinite(5000, x => (x - 0.5) * r.center.x)
    const p = r.center.add(x, 0)
    r.add(p, {
        color: 'red',
        radius: 10
    })
}

export const shapesVsRenderers1 = (r: LimnRenderer) => {
    const p = new Point(40, 40)
    // .add automatically types configuration accordingly
    r.add(p, {
        radius: 10,
        color: 'red'
    })

    // note that rectangles methods are different to points
    const line = new Rectangle({ p1: p, p2: p.add(20, 20) })
    r.add(line, {
        width: 2,
        stroke: 'yellow',
        fill: 'blue'
    })
}

export const shapesVsRenderers2 = (r: LimnRenderer) => {
    const p = new Point(50, 50)
    const pointR = new RPoint(p, {
        color: 'orange'
    })

    // Now we don't need second argument
    r.add(pointR)
}

export const demosCircles = (r: LimnRenderer) => {
    const t = r.timer.infiniteForward(10000, i => i)

    const circles = new GenerativeCollection(10, i => {
        return new Circle({ center: r.center, radius: i * 15 })
    }).map((c, i) => c.segment(0.5).rotate(i * t.value))

    r.add(circles, {
        width: 10,
        stroke: 'rgb(140 120 140)'
    })
}

export const basicConceptsExample = (r: LimnRenderer) => {

    const v = r.timer.infinite(5000)

    const line = new Line({
        p1: r.center,
        p2: r.center.add(50, 50)
    })
    const circle = new Circle({
        center: line.lerp(v),
        radius: 100
    })
    r.add(circle, {
        fill: 'rgb(0 255 0 / 10%)',
        stroke: 'red',
        width: 10
    })

    // alternatively you can instantiate Renderer manually and add it
    const circleRenderer = new RCircle(circle.with({ radius: 50 }), {
        fill: 'yellow'
    })

    r.add(circleRenderer)
}

export const bezierPoints = (r: LimnRenderer) => {
    const editing = atom('editing', 0)
    const p1 = r.center.add(-100, 0)
    const p2 = p1.add(200, 0)
    
    // copying values to make them independent signals that can be edited. Probably need nicer API for that
    const c1 = new Point(...new Line(p1, p2).center.add(0, -50).xy)
    const c2 = new Point(...c1.add(50, 0).xy)

    const points = new ReactiveArray([p1, p2])
    // Adding both p1 and p2 using reactive array
    r.add(points, {
        color: 'blue',
        radius: 5
    })

    // adding c1 and c2 independently as their colors are different
    r.add(c1, {
        color: computed(() => editing.value === 1 ? 'rgb(50 250 0)' : 'blue'),
        radius: 5
    })

    r.add(c2, {
        color: computed(() => editing.value === 2 ? 'rgb(50 250 0)' : 'blue'),
        radius: 5
    })

    const bezier = new CubicBezierCurve(p1, p2, c1, c2)
    r.add(bezier, {
        color: 'red',
        width: 2
    })
    const lines = new ReactiveArray([
        new Line(p1, c1),
        new Line(p2, c2)
    ])
    r.add(lines, {
        color: 'gray',
        width: 1
    });

    // This will be improved in future version of the library
    const canvas = ((r as any).ctx.canvas as HTMLCanvasElement);
    
    canvas.addEventListener('mousedown', () => {
        if (r.mousePos.distance(c1) < 20) {
            editing.set(1)
        } else if (r.mousePos.distance(c2) < 20) {
            editing.set(2)
        } else {
            editing.set(0)
        }
    })
    canvas.addEventListener('mouseup', () => {
        editing.set(0)
    })

    canvas.addEventListener('mousemove', () => {
        if (editing.value) {
            if (editing.value === 1) {
                c1.xy = r.mousePos.xy
            } else {
                c2.xy = r.mousePos.xy
            }
        }
    })
}

export const reactiveArrayBasics = (r: LimnRenderer) => {
    const array = new ReactiveArray([
        r.center,
        r.center.add(100, 0),
        r.center.add(-100, 0),
        r.center.add(0, 100),
        r.center.add(0, -100)
    ])
    r.add(array, {
        color: 'red',
        radius: 10
    })
}

export const reactiveArrayUpdate = (r: LimnRenderer) => {
    const p = r.center
    const arr = new ReactiveArray([p, p.add(100, 0)])
    const addElement = () => {

    }
    const canvas = ((r as any).ctx.canvas as HTMLCanvasElement);
    
    canvas.addEventListener('mousedown', () => {
        // FIXME: to implement push. It should implement full ArrayLike
    })
}

export const reactiveArrayFiltering = (r: LimnRenderer) => {
    const p = r.center
    const arr = new ReactiveArray([
        p,
        p.add(50, 0),
        p.add(100, 0),
        p.add(150, 0)
    ]).filter((point, i) => {
        if (r.mousePos.x > r.center.x) {
            return true
        } else {
            return i % 2 === 0
        }
    })
    r.add(arr, {
        color: 'red',
        radius: 10
    })
}

export const generativeArrayBasics = (r: LimnRenderer) => {
    const t = r.timer.infinite(5000, i => Math.ceil(1 + 10 * i))
    const array = new GenerativeCollection(t, i => {
        return new Circle({
            center: r.center,
            radius: i * 20
        })
    })

    // FIXME: for some reason we need to map it so it's ReactiveArray instead. Need to fix this in future versions
    r.add(array.map(i => i), {
        stroke: 'red',
        width: 5
    })
}

export const textBasics = (r: LimnRenderer) => {
    r.add(r.center, { color: 'red', radius: 5 })
    const text = new Text({
        text: 'Hello World',
        position: r.center,
        size: 50,
        anchor: 'center-center'
    })
    r.add(text, {
        color: 'red'
    })
}

export const textAnchors = (r: LimnRenderer) => {
    // Drawing center
    r.add(r.center, { color: 'grey', radius: 5 })

    const v = r.timer.infiniteForward(9000, i => Math.floor(i * 9)) // integers 0-8
    const vals = [
        'top-right', 'top-center', 'top-left',
        'center-right', 'center-center', 'center-left',
        'bottom-right', 'bottom-center', 'bottom-left'
    ]
    const anchor = computed(() => vals[v.value])
    const text = new Text({
        text: 'Hello World',
        position: r.center,
        size: 50,
        anchor: anchor
    })
    r.add(text, {
        color: 'red'
    })

    // showing label on top
    const anchorText = new Text({ text: anchor, position: new Point(r.center.x, 20), anchor: 'center-center', size: 10 })
    r.add(anchorText, { 
        color: 'red'
    })
}

const loremIpsumText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis varius ligula. Quisque nec nibh porttitor, molestie sapien et, semper nunc. Integer sed porttitor eros. Nunc consectetur augue ut sem euismod, a efficitur arcu faucibus. Nunc interdum ac velit viverra ultrices. Vestibulum pharetra magna urna, ac lobortis purus rutrum sed. Sed malesuada orci eget dolor viverra vestibulum. Aenean eu felis nec mauris venenatis ullamcorper. Maecenas odio risus, aliquet vel mauris sit amet, laoreet viverra lorem. Quisque et purus ultrices, porttitor est a, malesuada lorem. Nulla facilisi. Sed vitae imperdiet justo. Phasellus lacus neque, dignissim commodo massa sit amet, malesuada condimentum lacus. Mauris eget feugiat sem. Aliquam sit amet dui vel lectus bibendum maximus.'

export const textBox = (r: LimnRenderer) => {
    const width = r.timer.infinite(5000, i => 100 + 200 * i)
    const position = r.center.add(computed(() => -width.value / 2), -r.center.y + 40)
    const text = new Text({
        text: loremIpsumText,
        position,
        size: 10,
        anchor: 'top-left',
        width: width
    })
    r.add(text, {
        color: 'red'
    })

    const topLine = new Line(position, position.add(width, 0))
    r.add(topLine, {
        color: 'red',
        width: 2
    })

    const rightLine = new Line(topLine.p2, new Point(computed(() => topLine.p2.x), r.canvasRect.p2.y))

    r.add(rightLine, {
        color: 'red',
        width: 2
    })
}

export const comparingTimers = (r: LimnRenderer) => {
    const duration = 5_000
    // goes from 0 to 1 in 10s (10k ms) and then back
    const t1 = r.timer.infinite(duration)

    // goes from 0 to 0.5 in 10s and then back - function modifying original value
    const t2 = r.timer.infinite(duration, i => i / 2)

    // goes from 0 to 1 and resets
    const t3 = r.timer.infiniteForward(duration)

    // like above but goes to 0.5 only
    const t4 = r.timer.infiniteForward(duration, i => i / 2)

    const height = 20

    const timers = [t1, t2, t3, t4]

    const elements = new ReactiveArray(timers).map((timer, i) => {
        return new Text({
            text: computed(() => timer.value.toFixed(2)),
            position: new Point(0, r.center.y).add(50, -2 *height).add(0, i * height),
            size: 10,
            anchor: 'center-bottom'
        })
    })

    r.add(elements, {
        color: 'red'
    })

    const lines = elements.map(text =>
        new Line(text.position.add(20, 0), new Point(r.canvasRect.p2.x, text.position.y).add(-20, 0))
    )

    r.add(lines, {
        width: 2
    })
    
    const balls = lines.map((line, i) => {
        // we need to lerp based on the value
        return line.lerp(timers[i].value)
    })

    r.add(balls, {
        color: 'red',
        radius: 5
    })

}

export const layerBasics = (r: LimnRenderer) => {
    const p = new Point(...r.center.xy)
    const layer = new Layer([
        p
    ])

    r.add(layer, {
        color: 'red',
        radius: 10
    })

    // Nothing on this layer gets rerendered, it should only get rendered once.

    const t = r.timer.infinite(1000)
    const point = new Line(r.canvasRect.p1, r.canvasRect.p2).lerp(t)
    r.add(point, {
        color: 'red',
        radius: 20
    })

    
    // This will be improved in future version of the library
    const canvas = ((r as any).ctx.canvas as HTMLCanvasElement);
    
    canvas.addEventListener('mousedown', () => {
        p.xy = [100, 100]
    })

    canvas.addEventListener('mouseup', () => {
        p.xy = r.center.xy
    })
}

export const linearFillBasic = (r: LimnRenderer) => {
    const p1 = r.center.add(-50, -50)
    const rect = new Rectangle({
        p1: p1,
        p2: p1.add(100, 100)
    })

    const t = r.timer.infinite(5000)

    const fill = new LinearGradient({
        bounds: rect,
        ctx: ((r as any).ctx) as any,
        stops: [{
            color: 'red',
            value: 0
        },
    {
        color: 'green',
        value: t
    },
{
    color: 'black',
    value: 1
}]
    })

    r.add(rect, {
        fill: fill
    })
}

export const linearFillCircleBorder = (r: LimnRenderer) => {
    const c = r.center
    const radius = 50
    const rect = new Rectangle({
        p1: c.add(-radius, -radius),
        p2: c.add(radius, radius)
    })
    const fill = new LinearGradient({
        bounds: rect,
        ctx: (r as any).ctx,
        stops: [{
            color: 'red',
            value: 0
        }, { color: 'blue', value: 1}, { color: 'white', value: 0.5 }]
    })

    const rad = r.timer.infinite(5000, i => 20 + i * (radius - 20))
    const circle = new Circle({
        center: c,
        radius: rad
    })
    r.add(circle, {
        stroke: fill,
        width: 10
    })
}


export const radialFillBasic = (r: LimnRenderer) => {
    const c = r.center

    const t = r.timer.infiniteForward(5000, i => i * 2 * Math.PI)

    const c1 = new Circle({
        center: r.center.transform({
            rotate: t,
            origin: c.add(50, -100)
        }),
        radius: 20
    })

    const c2 = new Circle({
        center: r.center.add(0, 130).transform({
            rotate: t,
            origin: c
        }),
        radius: 200
    })

    const g = new RadialGradient({
        c1, c2,
        ctx: (r as any).ctx,
        stops: [{
            color: 'orange',
            value: 0
        },
        {
            color: 'rebeccapurple',
            value: 1
        }
    ]
    })

    const rect = new Rectangle({
        p1: c.add(-100, -100),
        p2: c.add(100, 100)
    })

    r.add(rect, {
        fill: g,
        stroke: 'black',
        width: 4
    })
}

export const conicFillBasic = (r: LimnRenderer) => {
    const c = r.center

    const t = r.timer.infiniteForward(5000, i => i * 2 * Math.PI)

    const circle = new Circle({
        center: r.center,
        radius: 100
    })

    const fill = new ConicGradient({
        angle: t,
        center: c.add(50, 0).transform({
            rotate: t,
            origin: c
        }),
        ctx: (r as any).ctx,
        stops: [{
           color: 'red',
           value: 0 
        }, {
            color: 'orange',
            value: 1
        }]
    })

    r.add(circle, {
        fill: fill
    })
}