<script setup lang="ts">
import { ref } from 'vue';
    function renderCode(externalCode: string) {
        console.log('RENDERING CODE', code)
        code.value = externalCode
    }
    let code = ref('hello')
    defineExpose({ renderCode })
</script>

<template>
    {{code}}
</template>