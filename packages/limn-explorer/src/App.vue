<script lang="ts">
export const description = 'Collapsible nested sidebars.'
export const iframeHeight = '800px'
</script>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import MainContainer from '@/components/mainContainer.vue'
</script>

<template>
  <SidebarProvider
    :style="{
      '--sidebar-width': '350px',
    }"
  >
    <AppSidebar />
    <SidebarInset>
    <MainContainer />
      <!-- <div class="flex flex-1 flex-col gap-4 p-4">
        <div
          v-for="index in 24"
          :key="index"
          class="aspect-video h-12 w-full rounded-lg bg-muted/50"
        />
      </div> -->
    </SidebarInset>
  </SidebarProvider>
</template>
