<script setup>
import Example from './components/examples/HeroExample.vue'
import BCodeblock from './components/BristleCodeblock.vue'
import { Circle } from '../src/primitives/Circle'
import { Line } from '../src/primitives/Line'
import { computed } from 'signia'
import { GenerativeCollection } from '../src/primitives/GenerativeCollection'
import Block from './components/Block.vue'

const f = (r) => {
  const t = r.timer.infinite(500, i => 5 + i * 20)
  const angle = r.timer.infiniteForward(2000, i => i * 2 * Math.PI)
  const p = r.center.add(100, 0).transform({ rotate: angle, origin: r.center })
  const c = new GenerativeCollection(10, i => new Circle(new Line(p, r.center).lerp(i/10), computed('s', () => t.value + i * 20)))
  r.add(c, {
      width: 2,
      strokeStyle: 'red'
  })
}

</script>
# Get Started
To install Bristle in your project you need to install `bristle` package and it's dependencies.
```bash
npm install bristle
```

<Block :code="f" />


## Signals
Bristle leavaranges power of signals to allow for reactive experience. Instead of calculating specific values, it encourages you to think in relationships between objects. When the value changes, all relevant values are being recomputed lazily.