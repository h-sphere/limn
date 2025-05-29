<script setup>
import Block from '../components/Block.vue'
</script>
# Reactive Array
Reactive Array represents an array which elements can change. This change can be reacted to as the whole array is stored as a signal. This is very useful building block when you want to introduce more dynamicity in your project.
It also exposes map and filter functions that return reactive arrays themselves. Thanks to that you can easily chain transformations.

It also allows to pass multiple shapes of the same time to r.add and style them together.

## Using Reactive Array to pass multiple elements to renderer
<Block name="reactiveArrayBasics" />

## Updating Reactive Array
<Block name="reactiveArrayUpdate" />

## Filtering
Here's an example of chailing reactive array with filter method to conditionally filter some of the elements. The even elements of an array appear when you move your mouse to the right half of the canvas.
<Block name="reactiveArrayFiltering" />