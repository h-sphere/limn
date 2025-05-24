import { Circle } from "../src/primitives/Circle"
import { GenerativeCollection } from "../src/primitives/GenerativeCollection"
import { Line } from "../src/primitives/Line"
import { Point } from "../src/primitives/Point"
import { Rectangle } from "../src/primitives/Rectangle"
import { Polygon } from "../src/primitives/Polygon"
import { CubicBezierCurve } from "../src/primitives/CubicBezierCurve"
import { computed, LimnRenderer } from '../src/index'
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
        new Circle(
            new Line(p, r.center).lerp(i / n),
            computed(() => t.value + i * 20)
        )
    )
    r.add(c, {
        width: 2,
        strokeStyle: 'red'
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
    const l = new Rectangle(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        strokeStyle: 'red',
        width: 1
    })
}

export const circle = (r: LimnRenderer) => {
    const c = new Circle(r.center, 50)
    r.add(c, {
        strokeStyle: 'red',
        width: 1
    })
}

export const polygon = (r: LimnRenderer) => {
    const p = new Polygon(r.center, 6, 50)
    r.add(p, {
        strokeStyle: 'red',
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

    const nGon = new Polygon(r.center, 31, maxSize)
    r.add(nGon.points.map(np => new Line(p, np)), {
        width: 1,
        color: 'red'
    })

    // concentric circles from the point
    const gen = new GenerativeCollection(
        10,
        i => new Circle(
            p,
            21 + i * i * 10 - 10 * Math.abs(p.x / r.size.x)
        )
    )

    r.add(gen, {
        width: 1,
        strokeStyle: 'red'
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
    const line = new Rectangle(p, p.add(20, 20))
    r.add(line, {
        width: 2,
        strokeStyle: 'yellow',
        fillStyle: 'blue'
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