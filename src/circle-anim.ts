import { atom, computed, react } from "signia"
import { LimnRenderer } from "./canvas/Renderer"
import { Point } from "./primitives/Point"
import { Polygon } from "./primitives/Polygon"
import { Line } from "./primitives/Line"
import { CubicBezierCurve } from "./primitives/CubicBezierCurve"
import { Circle } from "./primitives/Circle"

const com = <T>(fn: () => T) => {
    return computed('', () => fn())
}

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!
const renderer = new LimnRenderer(ctx).fitScreen()


const c = renderer.center

const r = renderer.timer.infinite(1000, i => 150 + 50 * i)

const circle = new Circle(c, r)

renderer.add(circle, {
    strokeStyle: com(() => `rgb(250 ${255 * i.value} ${r.value})`),
    width: 3,
    fillStyle: ''
})

const i = renderer.timer.infiniteForward(4300, i=>i)
const j = renderer.timer.infiniteForward(3440, i=>1-i)

renderer.add(circle.lerp(i), {
    color: 'white',
    width: 5
})

renderer.add(circle.lerp(j), {
    color: 'white',
    width: 5
})

const l = new Line(circle.lerp(i), circle.lerp(j))

renderer.add(l, {
    color: 'white',
    width: 1
})

renderer.add(l.tangent.center, {
    color: 'white',
    width: 10
})

renderer.add(l.center, {
    color: 'orange',
    width: 20
})


renderer.watch()