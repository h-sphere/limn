<script setup>
import Block from '../components/Block.vue'
import { CubicBezierCurve } from '../../src/index'

const timer = (r) => {
    const timer = r.timer
    const x = timer.infinite(5000, x => (x - 0.5) * r.center.x)
    const p = r.center.add(x, 0)
    r.add(p, {
        color: 'red',
        width: 10
    })
}

</script>

# Timers
Timers allow to easily create animations (both infinite and temporary). They can be run and stopped independently. Each renderer comes with internal instance of timer that is started when `.watch()` is called.

## Basic timers
<Block :code="timer" />