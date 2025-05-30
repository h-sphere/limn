<script setup>
import Block from '../components/Block.vue'
</script>
# Layer
Layer represents a container that's being drawn on a separate layer. They redraw only when they need to (one of the properties of nested elements that's being used is being changed). Thanks to that you can use them to wrap computationally heavy parts of your scene into the layer to avoid unncecesary rerenderings.

> [!DANGER] Redraws
> Currently layer might be redrawn for each property change. If you have multiple property changes within a single frame, they will trigger separate redraws. This problem will be addressed in the future versions of the library.

## Selective Updates
<Block name="layerBasics" />