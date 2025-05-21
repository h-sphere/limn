---
aside: false
---
<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Point
Point represents a location in 2D space.

## Rendering point
<BCodeblock>

```js
const p = new Point(50, 50)
r.add(p, {
    color: 'red',
    width: 10
})
```
</BCodeblock>

## Center point
Renderer exposes `.center` point that is a center point of the canvas for which given render is instantiated.

<BCodeblock>

```js
r.add(r.center, {
    color: 'red',
    width: 10
})
```

</BCodeblock>