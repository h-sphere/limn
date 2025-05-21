<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Polygon
You can create regular n-gons.

## Rendering polygons
<BCodeblock>

```js
const p = new Polygon(r.center, 6, 50)
r.add(p, {
    strokeStyle: 'red',
    width: 1
})
```
</BCodeblock>
