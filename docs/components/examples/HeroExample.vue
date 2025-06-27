<script setup>
import Limn from '../Limn.vue'
import { Circle, Line, GenerativeCollection } from 'limn'
import { computed } from 'signia'
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
    <Limn @render="code" />
</template>