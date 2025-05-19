import { atom, computed, transact } from "signia"
import { BPoint } from "./bristle/BPoint"
import { BristleRenderer } from "./bristle/Renderer"
import { Point } from "./primitives/Point"
import { Polygon } from "./primitives/Polygon"
import { BezierSpline } from "./primitives/BezierSpline"
import { CubicBezierCurve } from "./primitives/CubicBezierCurve"
import { BLine } from "./bristle/BLine"
import { Line } from "./primitives/Line"
import { BCubicBezierCurve } from "./bristle/BCubicBezierCurve"

const canvas = document.querySelector<HTMLCanvasElement>('#app')!
let w = atom('width', window.innerWidth)
let h = atom('height', window.innerHeight)
canvas.width = w.value
canvas.height = h.value

window.addEventListener('resize', () => {
    transact(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        w.set(window.innerWidth)
        h.set(window.innerHeight)
    })
})

const ctx = canvas.getContext('2d')!

const renderer = new BristleRenderer(ctx, w, h)

// const point = new Point(w / 2, h / 2)
// const point2 = point.add(100, 100)
// const rect = new Rectangle(point, point2)

// const bPoint = new BPoint(point, { color: 'white' })
// const bPoint2 = new BPoint(point2, { color: 'white' })

// const circle = new Circle(rect.center, rect.size.x / 2)

// renderer.add(BPoint.from(rect.center, { color: 'orange' }))
// renderer.add(BRectangle.from(rect, { strokeStyle: 'white', width: 1 }))
// renderer.add(bPoint)
// renderer.add(bPoint2)
// renderer.add(BCircle.from(circle, { fillStyle: 'rgb(255 255 255 / 40%)' }))

// const count = atom('length', 5)

// const gen = new GenerativeCollection(
//     count, (i) => new Point((i+1) * 100, 100)
// )

// const generativeColl = BArray.from(gen
// .map(e => BPoint.from(e)))

// renderer.add(generativeColl)

// const poly = new Polygon(rect.center, 5, rect.size.x)

// const pointz = poly.points.map(p => BPoint.from(p, { color: 'red', width: 10}))

// const lines = poly.edges.map(l => BLine.from(l, { color: 'yellow', width: 2}))

// renderer.add(BArray.from(lines))
// // renderer.add(BArray.from(pointz))

// const rot = atom('rotate', Math.PI )

// const add = atom('add', 100)

// const p = rect.center.add(0, add)
// .transform({
//     rotate: rot,
//     origin: rect.center
// })

// renderer.add(BPoint.from(p, { color: 'red' }))

// renderer.render()

// let t = 100

// let i = 1;

const planets = () => {

    const rot = atom('rotation', 0)
    const rot2 = computed('rot2', () => 2 * rot.value)
    const rot3 = computed('rot3', () => 5 * rot2.value)

    const sunCenter = new Point(
        computed('w', () => w.value / 2),
        computed('h', () => h.value / 2))

    const earth = sunCenter.add(200, 0).transform({
        rotate: rot,
        origin: sunCenter
    })

    const moon = earth.add(50, 0).transform({
        rotate: rot2,
        origin: earth
    })

    const moonsmoon = moon.add(20, 0).transform({
        rotate: rot3,
        origin: moon
    })

    // renderer.add(
    //     BCircle.from(new Circle(sunCenter, 200), {
    //         width: 3,
    //         strokeStyle: '#777'
    //     }),
    //     BCircle.from(new Circle(earth, 50), {
    //         width: 2,
    //         strokeStyle: '#AAA'
    //     }),
    //     BCircle.from(new Circle(moon, 20), {
    //         width: 1,
    //         strokeStyle: '#DDD'
    //     }),
    //     BPoint.from(sunCenter, {
    //         width: 50,
    //         color: 'orange'
    //     }),
    //     BPoint.from(earth, {
    //         width: 10,
    //         color: 'green'
    //     }),
    //     BPoint.from(moon, {
    //         width: 7,
    //         color: 'gray'
    //     }),
    //     BPoint.from(moonsmoon, {
    //         width: 5,
    //         color: 'lightblue'
    //     })
    // )
}

const center = new Point(
    computed('w', () => w.value / 2),
    computed('h', () => h.value / 2))
// const angle = atom('angle', 0)
// const padding = 50
// const originalRadius = atom('radius', 300)
// const radius = computed('radius', () => Math.min(h.value / 2 - padding, originalRadius.value))
// const n = atom('n', 5)
// const polygon = new Polygon(center, n, radius, angle)

// setInterval(() => {
//     angle.set(angle.value + 30)
// }, 100)

// const points = polygon.points.map(p => BPoint.from(p, { color: 'orange', width: 20}))

// renderer.add(polygon, {
//     // fillStyle: 'orange',
//     strokeStyle: 'orange',
//     width: 5
// })

// // renderer.add(points)
// // renderer.add(center, {
// //     color: 'red',
// //     width: 5
// // })

// renderer.add(points)

// const diff = atom('diff', 50)
// const minusdiff = computed('-diff', () => -1 * diff.value)

// const x = atom('x', 50)
// const y = atom('y', 50)
// const p = new Point(x, y)


// renderer.add(p, {
//     color: 'red',
//     width: 20
// })
// setInterval(() => {
//     console.log('moving')
//     x.set((x.value + Math.random() * 5) % canvas.width)
//     y.set((y.value + Math.random() * 10) % canvas.height)
// }, 5)

// const spline = new BezierSpline([
//     center, // p0
//     center.add(100, minusdiff),
//     center.add(100, diff),
//     center.add(200, 0), // p1
//     center.add(300, minusdiff),
//     center.add(300, diff),
//     center.add(400, 0), // p2
// ])


// renderer.add(new SquareGrid(100, { color: 'rgba(255 255 255 / 10%)', width: 2 }))

// renderer.add(new SpectreTiling({ x: w.value / 2, y: h.value / 2, size: 50, depth: 4, rotation: 0 }, {
//     width: 1,
//     stroke: 'red',
//     fill: 'white'
// }))

// renderer.add(new Mandelbrot())

// const res = renderer.add(spline, {})
// spline.points.map(p => BPoint.from(p, {
//     color: 'red',
//     width: 3
// })).forEach(r => renderer.add(r))


// const i = renderer.add(spline, {
//     width: 5,
//     color: 'red'
// })

// renderer.add(curve, {
//     width: 5
// })

let t = atom('t', 0)

const c = new Point(computed('x', () => w.value / 2), computed('y', () => h.value / 2))
const poly = new Polygon(c, 5, 200, computed('angle', () => t.value * 1))
renderer.add(poly.edges.map(e => BLine.from(e, { width: 1, color: 'red' })))

const points = poly.points
    .map((p, i) => new Line(p, poly.points.get((i + 2) % 5)))
    .map(line => {
        const l = new Line(center, line.lerp(t)).center
        return new CubicBezierCurve(line.p1, line.lerp(t), new Point(0, 0), [0, 0])
    })
    .map(line => new BCubicBezierCurve(line, { width: 1, color: 'red' }))

renderer.add(points)

// const curve = new CubicBezierCurve(center, center.add(140, 0), center.add(50, 50), center.add(50, -50))
// renderer.add(curve, {
//     color: 'red',
//     width: 0
// })

// const p = curve.lerp(t)
// renderer.add(p, {
//     width: 10,
//     color: 'orange'
// })

setInterval(() => {
    const v = Math.abs((Date.now() / 3000) % 1)
    t.set(2* Math.min(v, 1 - v))
    console.log(t.value)
}, 5)

renderer.watch()

const refresh = () => {

    // x.set(Math.random() * canvas.width)
    // y.set(Math.random() * canvas.height)
    // renderer.render()
    // t = (t + 0.01) % (2 * Math.PI)
    // diff.set(Math.sin(t * 3) * 50)
    // angle.set(t)
    // originalRadius.set(100  + 200 * Math.abs(Math.sin(t)))

    // count.set(Math.floor(t % 10))

    // point.x = w / 2 + 100 * Math.sin(t)
    // rot.set(rot.value + 0.01)
    // add.set(100 + Math.abs(Math.sin(t) * 50))

    // poly.length = 3 + Math.floor(((t / 2) % 20))

    // renderer.render()
    requestAnimationFrame(refresh)
}

// refresh()
