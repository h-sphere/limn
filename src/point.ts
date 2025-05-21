import { atom, computed, react } from "signia"
import { BristleRenderer } from "./bristle/Renderer"
import { Point } from "./primitives/Point"
import { Polygon } from "./primitives/Polygon"
import { Line } from "./primitives/Line"
import { CubicBezierCurve } from "./primitives/CubicBezierCurve"
import { Circle } from "./primitives/Circle"
import { GenerativeCollection } from "./primitives/GenerativeCollection"

const com = <T>(fn: () => T) => {
    return computed('', () => fn())
}

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!
const renderer = new BristleRenderer(ctx).fitScreen()

const c = renderer.center
const size = computed('size', () => Math.min(renderer.center.x, renderer.center.y))

const p = new Polygon(c, 12, computed('radius', () => 0.9 * size.value))

const points = p.points
const diagonals = points.map((p, i) => new Line(p, points.get((i + 4) % 12)))
const i = renderer.timer.infinite(3000, i => i)
const curvedDiagonals = diagonals.map(l => new CubicBezierCurve(l.p1, l.p2, l.lerp(i), new Line(l.p1, c).lerp(0.9)))

renderer.add(diagonals, {
    color: 'red',
    width: 0.001
})

renderer.add(curvedDiagonals, {
    color: 'red',
    width: 4
})

const cc = new GenerativeCollection(10, j => new Circle(c, computed('', () =>  i.value * j * 10)))

renderer.add(cc, {
    width: 4,
    fillStyle: '',
    strokeStyle: 'red'
})

renderer.watch()