<script setup>
import BCodeblock from '../components/BristleCodeblock.vue'
</script>

# Interactivity
You can change underlying signals based on user interactions like mouse position, clicks, gyroscope, etc.

## Mouse Movement
BristleRenderer exposes `mousePos` property which is a point storing current mouse position (relative to the canvas).

<BCodeblock>

```js
const p = r.mousePos
r.add(p, {
    color: 'red',
    width: 10
})
```
</BCodeblock>

## Advanced example
You can use mousePos like any other signals and chain it with other values. Here we display rays from the n-gon into the mouse location.

<BCodeblock>

```js
const p = r.mousePos
const maxSize = computed('size', () => Math.max(...r.size.xy))

const nGon = new Polygon(r.center, 31, maxSize)
r.add(nGon.points.map(np => new Line(p, np)), {
    width: 1,
    color: 'red'
})

// concentric circles from the point
const gen = new GenerativeCollection(
    10,
    i => new Circle(
        p,
        21 + i*i * 10 - 10 * Math.abs(p.x / r.size.x)
    )
)

r.add(gen, {
    width: 1,
    strokeStyle: 'red'
})

```
</BCodeblock>