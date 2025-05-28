<script setup>
import Example from './components/examples/HeroExample.vue'
import { Circle } from '../src/primitives/Circle'
import { Line } from '../src/primitives/Line'
import { computed } from 'signia'
import { GenerativeCollection } from '../src/primitives/GenerativeCollection'
import Block from './components/Block.vue'

</script>
# Limn
Limn is a reactive 2d geometry library allowing you to draw dynamic scenes with concise and declarative way. It can be used for live coding, experimenting with visualisations, preparing geometrical visuals and much more. If you have a good use-case for it (both hobbist or professional), send them over on our Discord!

## Installation

To install Limn in your project you need to install `limn` package and it's dependencies.
```bash
npm install limn
```

## Example use
Below you can see an example of simple animation created with limn:

<Block name="getStarted" />
