<script setup>
import Example from './components/examples/HeroExample.vue'
import { Circle } from '../src/primitives/Circle'
import { Line } from '../src/primitives/Line'
import { computed } from 'signia'
import { GenerativeCollection } from '../src/primitives/GenerativeCollection'
import Block from './components/Block.vue'

</script>
# Get Started
To install Limn in your project you need to install `limn` package and it's dependencies.
```bash
npm install limn
```

<Block name="getStarted" />


## Signals
Limn leavaranges power of signals to allow for reactive experience. Instead of calculating specific values, it encourages you to think in relationships between objects. When the value changes, all relevant values are being recomputed lazily.