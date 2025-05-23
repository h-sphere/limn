<script setup>
import { computed, onMounted } from 'vue'
import VCodeBlock from '@wdns/vue-code-block';
import Bristle from './Bristle.vue'


const props = defineProps({
    code: Function
})

const codeStr = computed(() => {
    return props.code?.toString().split('\n').slice(1, -1).join('\n')
})


const render = (r) => {
    props.code(r)
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
  </style>