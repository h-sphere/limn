/*
/**
Limn Explorer

Here you can experiment with Limn library.
CTRL+Enter        - execute code
CTRL+p      - pause/resume timer

On mac it's CMD instead of CTRL

CTRL+` - toggle code editor

Variables:
r - LimnRenderer setup for the background canvas


by hypersphere.
Check out tutorials on https://hypersphere.blog
**/

import { Circle, GenerativeCollection, RArc } from 'limn'


const t = r.timer.infiniteForward(40000, i => i)

    const circles = new GenerativeCollection(
        50,
        i => new Circle({ center: r.center, radius: i * 10 }))
        .map((c, i) => c.segment(0.5).rotate(i * t.value))
        .map((c, i) => new RArc(c, { stroke: `hsl(${i*10+200*t.value}, 50%, ${10+i*2}%)`, width: 10 }))

    r.add(circles)
*/