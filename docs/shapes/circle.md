<script setup>
import Block from '../components/Block.vue'



</script>

# Circle
You can draw circles

## Rendering a circle
<Block name="circle" />

## Tesselating
You can tesselate a circle (approximate it using polygon) by calling `.tesselate`.

<Block name="circleTesselate" />

## Section
You can get arc (section) of a circle calling `.segment`:

<Block name="circleSection" />

## Tesselating section
You can tesselate section in the same way as the whole circle:
<Block name="circleTesselateSection" />