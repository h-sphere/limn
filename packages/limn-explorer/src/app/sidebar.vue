<script setup>
import { demos } from '../demos';
defineEmits(['click', 'layoutChange'])
</script>
<template>
    <ul>
        <li>
            <button @click="$emit('layoutChange')">LAYOUT</button>
        </li>
    <li v-for="item in demos">
        <button @click="$emit('click', item)">
            {{ item.name }}
        </button>
    </li>
    </ul>
</template>