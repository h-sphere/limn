<script setup>
import { ref } from 'vue';
import Sidebar from './sidebar.vue'
import Editor from './editor.vue';
import Preview from './preview.vue';

const previewRef = ref()
const editorRef = ref()

function render(el) {
    editorRef.value.setCode(el.code)
    previewRef.value.renderCode(el.code)
}

const areStacked = ref(false)

function layoutChange() {
    console.log('new stack')
    areStacked.value = !areStacked.value
}

</script>
<template>
    <div class="app">
        <Sidebar
            @hover="(el) => console.log(el)"
            @click="render"
            @layout-change="layoutChange"
            />
        <div class="main" :class="{'stacked': areStacked}">
            <Editor ref="editorRef" />
            <Preview ref="previewRef" />
        </div>
    </div>
</template>
<style lang="css">
    .app {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1em;
        height: 100vh;
        background: #1e1e1e;
    }

    .main {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .stacked {
        background: red;
        grid-template-columns: 1fr;
        
    }

    .stacked * {
         grid-area: 1 / 1;
    }
</style>