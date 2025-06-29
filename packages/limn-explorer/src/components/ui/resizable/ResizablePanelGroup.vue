<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SplitterGroupProps & { class?: HTMLAttributes['class'], disabled: boolean }>()
const emits = defineEmits<SplitterGroupEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    v-bind="forwarded"
    :class="cn('flex h-full w-full data-[orientation=vertical]:flex-col', props.class, { 'grid-override': props.disabled })"
  >
    <slot />
  </SplitterGroup>
</template>
<style>
.grid-override {
  background: red;
  display: grid !important;
  /* place-content: center; */
  width: 100%;
  height: 100%;
}

.grid-override > * {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
}

.grid-override > [role="separator"] {
  display: none;
}
</style>