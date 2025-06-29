export const rectangle = `import { Rectangle } from 'limn'
    const rect = new Rectangle({ p1: r.center, p2: r.center.add(100, 100)})

    r.add(rect, {
        fill: 'red'
    })
`