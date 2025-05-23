<script setup>
import Block from '../components/Block.vue'

</script>
# Interactivity
You can change underlying signals based on user interactions like mouse position, clicks, gyroscope, etc.

## Mouse Movement
BristleRenderer exposes `mousePos` property which is a point storing current mouse position (relative to the canvas).

<Block name="interactivityBasic" />

## Advanced example
You can use mousePos like any other signals and chain it with other values. Here we display rays from the n-gon into the mouse location.

<Block name="interactivityAdvanced" />
