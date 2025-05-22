<script setup lang="ts">
import { useTemplateRef, onMounted, ref } from 'vue'
// import { Renderer } from '../../src/bristle/Renderer'
// const renderer = new Renderer()
import Bristle from './Bristle.vue'
import { Circle } from '../../src/primitives/Circle'
import { Line } from '../../src/primitives/Line'
import { Rectangle } from '../../src/primitives/Rectangle'
import { computed } from 'signia'
import { GenerativeCollection } from '../../src/primitives/GenerativeCollection'
import { Point } from '../../src/primitives/Point'
import { Polygon } from '../../src/primitives/Polygon'
import { CubicBezierCurve } from '../../src/primitives/CubicBezierCurve'

const slot = ref(null)

const { fn } = defineProps({
    fn: Function
})

console.log('FN', fn)

// THIS IS HACK TO PRESERVE IMPORTS
GenerativeCollection, Circle, Line, computed, Point, Polygon, CubicBezierCurve, Rectangle

const render = (r) => {
    const code = slot.value?.textContent.slice(2)
    console.log(code)
    eval(code)
    // fn(r)
}

</script>

<template>
  <div class="bristle-codeblock">
    <div ref="slot" class="left">
        <slot />
    </div>
    <div class="right">
      <Bristle @render="render" border="true" controls="true" />
    </div>
  </div>
</template>

<style>
  .bristle-codeblock {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1em;
  }

  @media (max-width: 768px) {
    .bristle-codeblock {
      grid-template-columns: auto;
    }
  }

  .left {
    /* background: red; */
  }

  .right {
    /* background: orange; */
  }
</style>