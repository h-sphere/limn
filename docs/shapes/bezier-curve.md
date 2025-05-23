<script setup>
import Block from '../components/Block.vue'
import { CubicBezierCurve } from '../../src/index'

const bezier = (r) => {
    const c = r.center
    const p = new CubicBezierCurve(
        c.add(-50, 0),
        c.add(50, 0),
        c.add(0, -25),
        c.add(0, 25)
    )
    r.add(p, {
        strokeStyle: 'red',
        width: 1
    })
}

</script>

# Bezier Curve
You can create bezier curve

## Rendering bezier curves
<Block :code="bezier" />