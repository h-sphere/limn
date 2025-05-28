<script setup>
import Block from './components/Block.vue'
</script>

# Shapes vs Renderers
Limn separates shapes (actual mathematical 2d objects) and renderers (methods to render them). This enables few unique features of limn:
- separation of concern
- testability: you can write unit tests to your shapes without relying on any rendering methods available in the browser
- modularity: you can use different renderers with your shapes when needed or not use renderers at all!

Shapes stores all the shape configuration (like position, number of points, etc).

Renderers stores all visual aspects of the shape like stroke color and width, fill color.

Shape corresponding renderers are prefixed with `R`, for example `RPoint` is a renderer for a `Point` shape class.

## How to use renderers
You can use renderers in 2 ways, explicitly or implicitly. In majority of cases implicit use is good enough but in rare cases you might want to have full control over renderer objects.

### Implicit instantiating
In majority of cases you don't need to care about separation of renderers and Limn built in TypeScript types will guide you. When you pass a basic shape to `LimnRenderer.add` method, it will prompt you for renderer configuration automatically and create renderer internally.

<Block name="shapesVsRenderers1" />

### Explicit instantiating
You can also use renderers directly. This gives you access to Renderer objects before you add them to `LimnRenderer` if you wish.

<Block name="shapesVsRenderers2" />