<script setup>
import Block from '../components/Block.vue'
import { Line, Point, Rectangle } from '../../src/index'
const rect = (r) => {
    const l = new Rectangle(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        strokeStyle: 'red',
        width: 1
    })
}
</script>

# Rectangle
Rectangle class represents a rectangle in 2D space.

## Rendering a rectangle
<Block :code="rect" />
