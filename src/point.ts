import { atom, computed, react } from "signia"
import { BristleRenderer } from "./bristle/Renderer"
import { Point } from "./primitives/Point"
import { Polygon } from "./primitives/Polygon"

const com = <T>(fn: () => T) => {
    return computed('', () => fn())
}

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!
const renderer = new BristleRenderer(ctx).fitScreen()

const width = renderer.timer.infinite(2000, i => i * 20)

renderer.add(renderer.center, {
    color: computed('color', () => `rgb(${width.value} ${width.value*2+100} ${width.value*3+50})`),
    width: width
})

renderer.add(new Polygon(renderer.center, 6, com(() => width.value * 10 + 100), renderer.timer.infiniteForward(10000, i => 2*Math.PI*i)), {
    width: 5,
    strokeStyle: 'white',
    fillStyle: 'rgb(255 255 255 / 10%)'
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