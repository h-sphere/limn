import { atom, computed } from "signia"
import { LimnRenderer } from "./canvas/Renderer"
import { Polygon } from "./primitives/Polygon"
import { Line } from "./primitives/Line"
import { CubicBezierCurve } from "./primitives/CubicBezierCurve"
import { Circle } from "./primitives/Circle"
import { GenerativeCollection } from "./primitives/GenerativeCollection"
import { RCircle } from "./canvas/RCircle"

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!

const renderer = new LimnRenderer(ctx).fitScreen()

const p = atom('p', 25)
const edges = atom('edges', 5)
const angle = atom('angle', 0)



const point = renderer.canvasRect.center

const circle = new Circle(point, 300)

const arr = new GenerativeCollection(20, i =>
    new Circle(point, computed('', () => i * p.value * 1))
).map((p, i) => new RCircle(p, { width: 44 - i*5, strokeStyle: `rgb(255 255 255 / ${Math.min(50, 30 + i * 5)}%)` }))

renderer.add(renderer.canvasRect, {
    fillStyle: 'orange',
    strokeStyle: '',
    width: 0
})

renderer.add(arr)

setInterval(() => {
    p.set(60 + Math.sin(Date.now() / 500) * 20)
}, 20)

// const poly = new Polygon(point, edges, 200, angle)
// // const res = renderer.add(poly.edges, {
// //     color: 'red',
// //     width: 1
// // })

// // renderer.add(poly.edges, {
// //     color: 'red',
// //     width: 1
// // })

// const points = poly.points

// // renderer.add(points, {
// //     color: 'orange',
// //     width: 5
// // })

// renderer.add(points
//     .map((p, i) => new Line(p, computed('p', () => points.get(Math.floor(i+ (edges.value + 3) / 2) % edges.value))))
//     .map((l) => new CubicBezierCurve(l.p1, l.p2, poly.center, l.p1))
//     , {
//     color: 'white',
//     width: 2
// })

// // console.log(res)

// const r = renderer.add(point, {
//     color: 'red',
//     width: 5
// })
// setInterval(() => {
//     // p.set(Math.sin(Date.now() / 300) * 100)
//     // angle.set(Math.sin(Date.now() / 30000) * 100)
//     // edges.set(Math.floor(9 + Math.sin(Date.now() / 500) * 5))
// }, 100)


renderer.watch()