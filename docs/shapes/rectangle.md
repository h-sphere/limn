<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Rectangle
Rectangle class represents a rectangle in 2D space.

## Rendering a line
<BCodeblock>

```js
const l = new Rectangle(new Point(10, 10), new Point(50, 50))
r.add(l, {
    strokeStyle: 'red',
    width: 1
})
```
</BCodeblock>
