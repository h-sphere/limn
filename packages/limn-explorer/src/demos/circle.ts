export const circle = `import { Circle, GenerativeCollection } from 'limn'


const t = r.timer.infiniteForward(10000, i => i)

    const circles = new GenerativeCollection(
        50,
        i => new Circle({ center: r.center, radius: i * 15 }))
        .map((c, i) => c.segment(0.2).rotate(i * t.value))

    r.add(circles, {
        width: 10,
        stroke: 'rgb(150 150 150)'
    })
`