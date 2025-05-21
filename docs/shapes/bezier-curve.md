<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Bezier Curve
You can create bezier curve

## Rendering bezier curves
<BCodeblock>

```js
const c = r.center
const p = new CubicBezierCurve(
    c.add(-50, 0),
     c.add(50, 0),
     c.add(0, -25),
     c.add(0, 25)
)
r.add(p, {
    strokeStyle: 'red',
    width: 1
})
```
</BCodeblock>
