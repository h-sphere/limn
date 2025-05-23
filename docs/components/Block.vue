<script setup>
import VCodeBlock from '@wdns/vue-code-block';
import Bristle from './Bristle.vue'
import { data } from '../examples.data'
import * as code from '../exampleCode.ts'

const props = defineProps({
  name: String
})

const codeStr = data[props.name]

const render = (r) => {
  code[props.name](r)
}

</script>
<template>
    <div class="bristle-codeblock">
        <div class="left">
            <VCodeBlock
                :code="codeStr"
                highlightjs
                lang="javascript"
                theme="github"
                />
        </div>
        <div class="right">
            <Bristle @render="render" border controls />
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
  </style>