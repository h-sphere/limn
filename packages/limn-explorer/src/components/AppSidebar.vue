<script setup lang="ts">
import { BookOpenText, Cog, Play, Waves, MonitorUp } from 'lucide-vue-next'
import Logo from './sidebar/limn-icon-explorer.svg?url'
import { h, ref } from 'vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuItem,
  type SidebarProps,
  useSidebar,
} from '@/components/ui/sidebar'
import { config } from '../state/config'
import Demos from './sidebarContent/demos.vue'
import Config from './sidebarContent/config.vue'
import Filesystem from './sidebarContent/filesystem.vue'
import { cn } from '../lib/utils'
import Collaborate from './sidebarContent/collaborate.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data
const data = {
  navMain: [
    {
      title: 'Run',
      icon: Play
    },
    // {
    //   title: 'Playground',
    //   icon: Folder
    // },
    {
      title: 'Examples',
      icon: BookOpenText
    },
    {
      title: 'Collaborate',
      icon: MonitorUp
    },
    {
      title: 'Config',
      url: '#',
      icon: Cog,
      isActive: false,
    },
  ]
}

const activeItem = ref(data.navMain[0])
const { setOpen, open } = useSidebar()
setOpen(false)

</script>

<template>
  <Sidebar
    class="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
    v-bind="props"
  >
    <!-- This is the first sidebar -->
    <!-- We disable collapsible and adjust width to icon. -->
    <!-- This will make the sidebar appear as icons. -->
    <Sidebar
      collapsible="none"
      class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as-child class="md:h-8 md:p-0">
              <a href="#">
                <div class="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Waves class="size-4" />
                  <img :src="Logo" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent class="px-1.5 md:px-0">
            <SidebarMenu>
              <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
                <SidebarMenuButton
                  :tooltip="h('div', { hidden: false }, item.title)"
                  :is-active="activeItem.title === item.title"
                  :class="cn('px-2.5 md:px-2', { 'bg-green-300 hover:bg-green-500': item.title === 'Run' && config.autoRun })"
                  @click="() => {
                    if (item.title === 'Run') {
                      config.runCurrentCode()
                      return
                    }
                    if (activeItem.title === item.title && open) {
                      setOpen(false)
                      return
                    }
                    activeItem = item
                    setOpen(true)
                  }"
                >
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>

    <!--  This is the second sidebar -->
    <!--  We disable collapsible and let it fill remaining space -->
    <Sidebar collapsible="none" class="hidden flex-1 md:flex">
      <SidebarHeader class="gap-3.5 border-b p-4">
        <div class="flex w-full items-center justify-between">
          <div class="text-base font-medium text-foreground">
            {{ activeItem.title }}
          </div>
        </div>
        <!-- <SidebarInput placeholder="Type to search..." /> -->
      </SidebarHeader>
      <SidebarContent>
        <Demos v-if="activeItem.title === 'Examples'" />
        <Config v-if="activeItem.title === 'Config'" />
        <Filesystem v-if="activeItem.title === 'Playground'" />
        <Collaborate v-if="activeItem.title === 'Collaborate'" />
      </SidebarContent>
    </Sidebar>
  </Sidebar>
</template>
