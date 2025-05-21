<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Circle
You can draw circles

## Rendering a line
<BCodeblock>

```js
const c = new Circle(r.center, 50)
r.add(c, {
    strokeStyle: 'red',
    width: 1
})
```
</BCodeblock>
