<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRight } from 'lucide-vue-next';
import { rectangle } from '../../demos/rectangle';
import { point } from '../../demos/point';
import { circle } from '../../demos/circle';
import { config } from '../../state/config';
import SidebarGroupContent from '../ui/sidebar/SidebarGroupContent.vue';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Point',
          code: point,
          isActive: false
        },
        {
          title: 'Rectangle',
          code: rectangle
        },
      ],
    },
    {
      title: 'Advanced',
      items: [
        {
          title: 'Circles Animation',
          code: circle
        }
      ],
    }
  ],
}

function selectCode(code: any) {
  config.currentCode = code
}

</script>

<template>
    <SidebarGroup>
      <SidebarGroupContent class="px-1.5 md:px-0">
          <SidebarMenu>
            <Collapsible
              v-for="(item, index) in data.navMain"
              :key="item.title"
              :default-open="index === 1"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton>
                    {{ item.title }}
                    <ChevronRight class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent v-if="item.items.length">
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                      <SidebarMenuSubButton
                        as-child
                        :is-active="childItem.isActive"
                      >
                        <button class="w-full" @click="selectCode(childItem)">{{ childItem.title }}</button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
</template>