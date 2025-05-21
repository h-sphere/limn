<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Line
Line class represents a line in 2D space.

## Rendering a line
<BCodeblock>

```js
const l = new Line(new Point(10, 10), new Point(50, 50))
r.add(l, {
    color: 'red',
    width: 1
})
```
</BCodeblock>
