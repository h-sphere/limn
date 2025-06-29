<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { LimnRenderer } from 'limn';
import * as limnVars from 'limn'
import { config } from '../../state/config';

const canvas = ref()
let renderer: LimnRenderer
onMounted(() => {
    const ctx = canvas.value.getContext('2d')!
    renderer = new LimnRenderer(ctx)
    renderer.fitContainer()
    

    renderer.watch()
})


function resolveImports(code: string) {
    // Replace import statements with variable declarations
    return code.replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]limn['"];?\s*/g,
        (match, imports) => {
            // Clean up imports and create destructuring
            const cleanImports = imports.split(',').map((imp: string) => imp.trim()).join(', ')
            return `// Import resolved: ${match}\nconst { ${cleanImports} } = limnLibrary; // Get from passed objects\n`
        }
    )
}


function runCode(inputCode: string) {

    console.log('preview running code', inputCode)

    const code = resolveImports(inputCode)

    // const code = resolveImports(editor.getValue())

    renderer.clear()
    const fn = new Function('r', 'limnLibrary', code)
    fn(renderer, limnVars)
}

defineExpose({ runCode })

watchEffect(() => {
    const shouldPause = config.pause

    if (!renderer) {
        return
    }
    if (shouldPause && renderer.timer.isRunning) {
        renderer.timer.pause()
    }
    if(!shouldPause && !renderer.timer.isRunning) {
        renderer.timer.start()
    }

    // if (shouldRun /*&& !renderer.timer.isRunning*/) {
    //     renderer.timer.start()
    // }
    // if (!shouldRun /*renderer.timer.isRunning*/) {
    //     renderer.timer.pause()
    // }
})

</script>

<template>
    <div class="preview">
        <canvas class="canvas" ref="canvas"></canvas>
    </div>
</template>
<style>

.preview {
    height: 100%;
    max-height: 100vh;
    width: 100%;
    overflow: hidden;
}

.canvas {
    width: 100%;
    height: 100%;
}

</style>