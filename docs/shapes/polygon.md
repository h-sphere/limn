<script setup>
import Block from '../components/Block.vue'
</script>

# Polygon
You can create regular n-gons.

## Rendering polygons
<Block name="polygon" />

## Animating number of sides
<Block name="polygonAnimate" />

## Accessing edges
You can access polygon's edges and get [Reactive Array](./reactive-array) containing all of them. This can be used to modify them further.
<Block name="polygonEdges" />