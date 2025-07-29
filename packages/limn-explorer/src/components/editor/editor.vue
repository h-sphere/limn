<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue';
import { start } from '../../demos';
import { setupEditor } from './editor';
import { config } from '../../state/config';
import { debounce } from '../../lib/utils';
import { monacoEditor } from './editorRef';

const editorRef = ref()
let editor: monaco.editor.IStandaloneCodeEditor
let internalCompileTs = (a:string) => Promise.resolve(a)
onMounted(async () => {
    const { editor: internalEditor, compileTypeScript } = await setupEditor(editorRef.value, start)
    editor = internalEditor
    monacoEditor.value = editor

    window.LIMN_EDITOR = editor

    internalCompileTs = compileTypeScript

    editor.onDidChangeModelContent(debounce(contentChange => {
        if (!config.autoRun) {
            return
        }
        if (contentChange.isFlush) {
            return
        }
        config.runCurrentCode()
    }, 500))


    
editor.addAction({
    id: 'limn.run-code',
    label: 'Limn: Run Code',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 0.90,
    keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
    ],
    run:function() {
        console.log('run code')
        // run code
        config.runCurrentCode()
    }
})

})

function setCode(code: string) {
    if (!editor) {
        return
    }
    editor.setValue(code)
}

const compileTypeScript = (code: string) => {
    return internalCompileTs(code)
}

// async function compileTypeScript(code: string): Promise<string> { 
//     // FIXME: proper compile here.
//     console.log('COMPILING', code)
//     return code
// }

function getCode() {
    return editor.getValue()
}

defineExpose({ setCode, compileTypeScript, getCode })



</script>
<template>
    <div ref="editorRef" class="monaco-editor-container"></div>
</template>
<style>

.monaco-editor-container {
    background: #1e1e1e;
    height: 100%;
    width: 100%;
}

.monaco-editor-container .monaco-editor {
    --vscode-editor-background: transparent;
    --vscode-focusBorder: transparent;
    --vscode-editorGutter-background: transparent;
}

.monaco-editor-container .monaco-editor .view-line span:not(:has(span)) {
    background: rgb(30 30 30 / 70%);
}

</style>