import { Circle } from "../src/primitives/Circle"
import { GenerativeCollection } from "../src/primitives/GenerativeCollection"
import { Line } from "../src/primitives/Line"
import { Point } from "../src/primitives/Point"
import { Rectangle } from "../src/primitives/Rectangle"
import { Polygon } from "../src/primitives/Polygon"
import { CubicBezierCurve } from "../src/primitives/CubicBezierCurve"
import { computed, LimnRenderer, RCircle } from '../src/limn'
import { RPoint } from "../src/canvas/RPoint"

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