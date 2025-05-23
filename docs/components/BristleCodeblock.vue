<script setup lang="ts">
import { ref, defineProps } from 'vue'
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
import VCodeBlock from '@wdns/vue-code-block';

const props = defineProps({
  controls: Boolean,
  border: Boolean
})

// THIS IS HACK TO PRESERVE IMPORTS
[GenerativeCollection, Circle, Line, computed, Point, Polygon, CubicBezierCurve, Rectangle]

const render = (variable) => {
    // const r = variable
    // window.r = variable
    // if (window.r && slot.value && !wasRenderer) {
    //   wasRenderer = true
    //   const code = slot.value?.textContent.slice(2)
    //   eval(code)
      
    // }
}
</script>

<template>
  <div class="bristle-codeblock">
    <div class="left">
        <VCodeBlock
          :code="code"
          highlightjs
          label="Hello World"
          lang="javascript"
          theme="neon-bunny"
        />
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