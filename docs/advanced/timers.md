<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Timers
Timers allow to easily create animations (both infinite and temporary). They can be run and stopped independently. Each renderer comes with internal instance of timer that is started when `.watch()` is called.

## Basic timers
<BCodeblock>

```js
const timer = r.timer
const x = timer.infinite(5000, x => (x - 0.5) * r.center.x)
const p = r.center.add(x, 0)
r.add(p, {
    color: 'red',
    width: 10
})
```
</BCodeblock>
