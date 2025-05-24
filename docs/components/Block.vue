<script setup>
import VCodeBlock from '@wdns/vue-code-block';
import Limn from './Limn.vue'
import { data } from '../examples.data'
import * as code from '../exampleCode.ts'
import { useData } from 'vitepress'


const props = defineProps({
  name: String
})

const codeStr = data[props.name]

const render = (r) => {
  code[props.name](r)
}

const { theme, isDark } = useData()

</script>
<template>
    <div class="limn-codeblock">
        <div class="left codeblock">
            <VCodeBlock
                :code="codeStr"
                highlightjs
                lang="javascript"
                :theme="isDark ? 'github-dark' : 'github'"
                />
        </div>
        <div class="right">
            <Limn @render="render" border controls />
        </div>
    </div>
</template>
<style>
  .limn-codeblock {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 1em;
  }

  @media (max-width: 768px) {
    .limn-codeblock {
      grid-template-columns: 100%;
    }
  }

  .codeblock {
    max-width: 100;
  }

  .codeblock code {
    background-color: var(--vp-code-block-bg); 
  }
  </style>