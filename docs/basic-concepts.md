<script setup>
import Block from './components/Block.vue'
</script>

# Basic Concepts
To fully utilise power of Limn, you should learn about main concepts that drive it.

## Signals
In limn every value is a signal. Every numerical property, every color, every shape. Thanks to that you can think in terms of relationships between objects. Limn takes care of all the computations. All computations are lazy by default.
If you are not familar with signals, we highly recommend introduction to signals in [signia documentation](https://signia.tldraw.dev/docs/what-are-signals) which Limn uses under the hood.

## Shapes vs Renderers
Limn separates shapes from the renderers. Shapes are any primitive geometrical objects like points, lines, rectangles, splines, etc. They do not have any inherit visual aspect to them, they are mathematical concepts.
Shape renderers are classes that wrap shapes with visual aspects like stroke color, fill color or stroke width. Let's take the following example:

<Block name="basicConceptsExample" />

In the example above:
- `v` is signal instantiated using timer. It is used to move the circle along the line. You can learn more about timers further down in the documentation.
- `line` is a shape that defines trajectory for the circles. Note that we do not create any renderers for the line. It is being used only to compute positions
- `circle` is a shape that uses point alongside the line as it's center. note that we just pass `v` to the lerp function to allow for animating it
- `r.add(circle, { /* config */})` creates new renderer for the circle (`RCircle`). This is the simplest and most common way of passing your shapes to the renderer.
- `circleRenderer` is an explicit renderer for the second circle. Second circle is defined based off the first one with different radius. Note that they will both move alongside the line
- `r.add(renderer)` adds the renderer to the current drawing context. Limn know that you are passing instance of renderable element and does not require second parameter. 