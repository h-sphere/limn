<script setup lang="ts">
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from '@/components/ui/resizable'
import Editor from '@/components/editor/editor.vue'
import Preview from '@/components/preview/preview.vue'
import { config } from '../state/config'
import { computed, ref, watchEffect } from 'vue'

const dir = computed(() => config.layout === 'vertical' ? 'vertical' : 'horizontal')

const disabled = computed(() => config.layout === 'stacked')

const editor = ref()
const preview = ref()

watchEffect(async () => {
  const code = config.currentCode.code
  if (!editor.value || !preview.value) {
    return
  }
  editor.value.setCode(code)
  const compiledCode = await editor.value.compileTypeScript(code)
  preview.value.runCode(compiledCode)
})

config.runCurrentCode = async () => {
  const code = editor.value.getCode()
  console.log('CURRENT CODE', code)
  const compiledCode = await editor.value.compileTypeScript(code)
  preview.value.runCode(compiledCode)
}


</script>
<template>
  <ResizablePanelGroup :direction="dir" :disabled="disabled">
    <ResizablePanel>
      <Editor ref="editor" />
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>
      <Preview ref="preview" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>