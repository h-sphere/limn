import { atom, computed, react } from "signia"
import { BristleRenderer } from "./bristle/Renderer"
import { Point } from "./primitives/Point"
import { Polygon } from "./primitives/Polygon"
import { Line } from "./primitives/Line"
import { CubicBezierCurve } from "./primitives/CubicBezierCurve"

const com = <T>(fn: () => T) => {
    return computed('', () => fn())
}

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!
const renderer = new BristleRenderer(ctx).fitScreen()

// const width = renderer.timer.infinite(2000, i => i * 20)

// renderer.add(renderer.center, {
//     color: computed('color', () => `rgb(${width.value} ${width.value*2+100} ${width.value*3+50})`),
//     width: width
// })

// renderer.add(new Polygon(renderer.center, 6, com(() => width.value * 10 + 100), renderer.timer.infiniteForward(10000, i => 2*Math.PI*i)), {
//     width: 5,
//     strokeStyle: 'white',
//     fillStyle: 'rgb(255 255 255 / 10%)'
// })


// const rot = renderer.timer.infiniteForward(5000, i => -i * Math.PI * 2)

// const line = new Line(renderer.center, renderer.center.add(100, 100)).transform({ rotate: rot })

// renderer.add(line, {
//     width: 5,
//     color: 'red'
// })

// renderer.add(line.normalized.scale(1), {
//     width: 10,
//     color: 'green'
// })

// renderer.add(line.tangent, {
//     width: 5,
//     color: 'white'
// })

const c = renderer.center
const i = renderer.timer.infinite(5000)
const j = renderer.timer.infinite(1000)
const bezier = new CubicBezierCurve(
    c,
    c.add(200, 200),
    c.add(200, 100).transform({ origin: c, rotate: com(() => i.value * Math.PI)}),
    c.add(-50, 0).add(com(() => j.value * -100), com(() => 100 * i.value + 30)))


renderer.add(bezier, {
    color: 'red',
    width: 5
})

renderer.add(bezier.points, {
    color: 'yellow',
    width: 5
})

renderer.add(bezier.lerp(i), {
    color: 'white',
    width: 10
})

renderer.watch()

window.addEventListener('mousedown', () => {
    if (renderer.timer.isRunning) {
        console.log('PAUSE')
        renderer.timer.pause()
    }
})

window.addEventListener('mouseup', () => {
    if (!renderer.timer.isRunning) {
        console.log('RESTART')
        renderer.timer.start()
    }
})