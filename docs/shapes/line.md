<script setup>
import Block from '../components/Block.vue'
import { Line, Point } from '../../src/index'

const line = (r) => {
    const l = new Line(new Point(10, 10), new Point(50, 50))
    r.add(l, {
        color: 'red',
        width: 1
    })
}

</script>

# Line
Line class represents a line in 2D space.

## Rendering a line

<Block :code="line" />

<BCodeblock>

</BCodeblock>
