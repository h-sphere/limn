<script setup>
import Block from '../components/Block.vue'
</script>
# Pan and Zoom
You can pan and zoom Limn renderer allowing to use it as infinite canvas.

Note: Limn renders all elements, even if they are off-screen. We plan to include ability for partial rendering in the future using QuadTrees but for now it's not available.

The renderer starts with zoom=1 and origin at (0, 0) (top, left). You can modify these values like all other parameters using signals.

## Zoom
You can set zoom value

<Block name="zoomBasic" />

## Panning
You can pan your canvas by updating `.topLeft` property

<Block name="panBasic" />