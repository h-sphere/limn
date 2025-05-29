<script setup>
import Block from '../components/Block.vue'

</script>

# Bezier Curve
You can create bezier curve

## Rendering bezier curves
<Block name="bezier" />

## Interactive bezier curves
Below you can see all the relationships between bezier curves to get some intuition on their behaviour. This is also a good example how you can implement interactivity using Limn. The example below allows you to select either of the control points of te bezier spline and move them. Their color changes once they are selected.
<Block name="bezierPoints" />