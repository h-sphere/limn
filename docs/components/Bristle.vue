<script setup>
import { useTemplateRef, onMounted, ref, defineProps } from 'vue'
// import { Renderer } from '../../src/bristle/Renderer'
// const renderer = new Renderer()
import { BristleRenderer } from '../../src/bristle/Renderer'

const emit = defineEmits(['render'])
const props = defineProps({
  controls: Boolean,
  border: Boolean
})
const canvas = useTemplateRef('bristle-canvas')
let r
onMounted(() => {
  const v = canvas.value
  v.width = v.clientWidth
  v.height = v.clientHeight
  r = new BristleRenderer(v.getContext('2d'))
  emit('render', r)
  r.watch()
})

let icon = ref("⏸︎")

function togglePause() {
  if (r.timer.isRunning) {
    r.timer.pause()
    icon.value = "▶︎"
  } else {
    r.timer.start()
    icon.value = "⏸︎"
  }
}

</script>

<template>
  <div class="bristle-example-container" :class="{ 'with-border': props.border, 'with-controls': props.controls}">
    <canvas class="bristle-example" ref="bristle-canvas"></canvas>
    <button class="pause-button" @click="togglePause">{{icon}}</button>
  </div>
</template>

<style>

.bristle-example-container {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  margin: 16px 0;
}

.with-border {
  border: 1px solid var(--vp-c-divider);
}

.bristle-example {
  width: 100%;
  height: 100%;
}

.pause-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-divider);
  color: var(--vp-c-text-1);
  padding: 0.2em 0.5em;
  display: none;
  border-radius: 5px;
  width: 4ch;
  text-align: center;
}

.pause-button:hover {
  background: var(--vp-c-border);
}

.with-controls .pause-button {
  display: block;
}
</style>