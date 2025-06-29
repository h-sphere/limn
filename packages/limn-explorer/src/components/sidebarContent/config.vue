<script setup lang="ts">
import { config } from '../../state/config';
import LayoutOptions from '../form/layoutOptions.vue'
import Label from '../ui/label/Label.vue';
import SidebarGroup from '../ui/sidebar/SidebarGroup.vue';
import Switch from '../ui/switch/Switch.vue';
</script>

<template>
    <SidebarGroup>
    <div class="flex w-full items-center justify-between p-1">
          <div class="text-sm">
            Layout
          </div>
          <Label class="flex items-center gap-2 text-sm">
                    <LayoutOptions />
          </Label>
      </div>
      <div class="flex w-full items-center justify-between p-1">
          <div class="text-sm">
            Pause
          </div>
          <Label class="flex items-center gap-2 text-sm">
                    <Switch v-model="config.pause" />
          </Label>
      </div>
      <div class="flex w-full items-center justify-between p-1">
          <div class="text-sm">
            Autorun
          </div>
          <Label class="flex items-center gap-2 text-sm">
                    <Switch v-model="config.autoRun" />
          </Label>
      </div>
    </SidebarGroup>
</template>