<script setup>
import Block from '../components/Block.vue'
import { Point } from '../../src/index'

const pointAbsolute = (r) => {
    const p = new Point(50, 50)
    r.add(p, {
        color: 'red',
        width: 10
    })
}

const pointCenter = (r) => {
    r.add(r.center, {
        color: 'red',
        width: 10
    })
}

</script>

# Point
Point represents a location in 2D space.

## Rendering point
<Block :code="pointAbsolute" />

## Center point
Renderer exposes `.center` point that is a center point of the canvas for which given render is instantiated.

<Block :code="pointCenter" />