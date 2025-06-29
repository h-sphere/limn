<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { config } from '../../state/config';
console.log('config', config)
</script>

<template>
  <Select v-model="config.layout">
    <SelectTrigger>
      <SelectValue placeholder="Layout" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="horizontal">
          Horizontal
        </SelectItem>
        <SelectItem value="vertical">
          Vertical
        </SelectItem>
        <SelectItem value="stacked">
          Stacked
        </SelectItem>
    </SelectContent>
  </Select>
</template>