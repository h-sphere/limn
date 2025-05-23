<script setup>
import Block from '../components/Block.vue'
import { Circle } from '../../src/index'

const circle = (r) => {
    const c = new Circle(r.center, 50)
    r.add(c, {
        strokeStyle: 'red',
        width: 1
    })
}

</script>

# Circle
You can draw circles

## Rendering a circle
<Block :code="circle" />
