export const polygonAnimation = `import { Polygon, Text, computed } from 'limn'

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
})`