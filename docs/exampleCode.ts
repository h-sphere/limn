import { Circle } from "../src/primitives/Circle"
import { GenerativeCollection } from "../src/primitives/GenerativeCollection"
import { Line } from "../src/primitives/Line"
import { Point } from "../src/primitives/Point"
import { Rectangle } from "../src/primitives/Rectangle"
import { Polygon } from "../src/primitives/Polygon"
import { CubicBezierCurve } from "../src/primitives/CubicBezierCurve"
import { computed } from '../src/index'

export const getStarted = (r) => {
    const t = r.timer.infinite(500, i => 5 + i * 20)
  const angle = r.timer.infiniteForward(2000, i => i * 2 * Math.PI)
  const p = r.center.add(100, 0).transform({ rotate: angle, origin: r.center })
  const c = new GenerativeCollection(10, i => new Circle(new Line(p, r.center).lerp(i/10), computed(() => t.value + i * 20)))
  r.add(c, {
      width: 2,
      strokeStyle: 'red'
  })
}

export const pointAbsolute = (r) => {
    const p = new Point(50, 50)
    r.add(p, {
        color: 'red',
        width: 10
    })
}

export const pointCenter = (r) => {
    r.add(r.center, {
        color: 'red',
        width: 10
    })
}

export const line = (r) => {
    const l = new Line(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        color: 'red',
        width: 1
    })
}

export const rect = (r) => {
    const l = new Rectangle(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        strokeStyle: 'red',
        width: 1
    })
}

export const circle = (r) => {
    const c = new Circle(r.center, 50)
    r.add(c, {
        strokeStyle: 'red',
        width: 1
    })
}

export const polygon = (r) => {
    const p = new Polygon(r.center, 6, 50)
    r.add(p, {
        strokeStyle: 'red',
        width: 1
    })
}

export const bezier = (r) => {
    const c = r.center
    const p = new CubicBezierCurve(
        c.add(-50, 0),
        c.add(50, 0),
        c.add(0, -25),
        c.add(0, 25)
    )
    r.add(p, {
        strokeStyle: 'red',
        width: 1
    })
}

export const interactivityBasic = (r) => {
   const p = r.mousePos
    r.add(p, {
        color: 'red',
        width: 10
    })
}

export const interactivityAdvanced = (r) => {
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
            21 + i*i * 10 - 10 * Math.abs(p.x / r.size.x)
        )
    )

    r.add(gen, {
        width: 1,
        strokeStyle: 'red'
    })

}

export const timer = (r) => {
    const timer = r.timer
    const x = timer.infinite(5000, x => (x - 0.5) * r.center.x)
    const p = r.center.add(x, 0)
    r.add(p, {
        color: 'red',
        width: 10
    })
}