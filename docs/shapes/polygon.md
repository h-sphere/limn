<script setup>
import Block from '../components/Block.vue'
import { Polygon } from '../../src/index'

const polygon = (r) => {
    const p = new Polygon(r.center, 6, 50)
    r.add(p, {
        strokeStyle: 'red',
        width: 1
    })
}

</script>

# Polygon
You can create regular n-gons.

## Rendering polygons
<Block :code="polygon" />