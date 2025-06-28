<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue';

const editorRef = ref()
let editor: monaco.editor.IStandaloneCodeEditor
onMounted(() => {
    editor = monaco.editor.create(editorRef.value, {
        value: '',
        language: 'typescript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2,
        wordWrap: 'on',
        lineNumbers: 'on',
        suggest: {
            showWords: false,
            showKeywords: false,
            showEnums: false,
            showClasses: false,
            showConstructors: false
        }
    })
})

function setCode(code: string) {
    editor.setValue(code)
}

defineExpose({ setCode })



</script>
<template>
    <div ref="editorRef" class="monaco-editor-container"></div>
</template>
<style>

.monaco-editor-container .monaco-editor {
    --vscode-editor-background: transparent;
    --vscode-focusBorder: transparent;
    --vscode-editorGutter-background: transparent;
}
</style>