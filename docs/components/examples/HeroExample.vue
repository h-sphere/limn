<script setup>
import Bristle from '../Bristle.vue'
import { BristleRenderer } from '../../../src/bristle/Renderer'
import { Circle } from '../../../src/primitives/Circle'
import { Line } from '../../../src/primitives/Line'
import { computed } from 'signia'
import { GenerativeCollection } from '../../../src/primitives/GenerativeCollection'
function code(r) {
    const t = r.timer.infinite(500, i => 5 + i * 20)
    const angle = r.timer.infiniteForward(2000, i => i * 2 * Math.PI)
    const p = r.center.add(100, 0).transform({ rotate: angle, origin: r.center })
    const c = new GenerativeCollection(10, i => new Circle(new Line(p, r.center).lerp(i/10), computed('s', () => t.value + i * 20)))
    r.add(c, {
        width: 2,
        strokeStyle: 'red'
    })
}
</script>
<template>
    <Bristle @render="code" />
</template>