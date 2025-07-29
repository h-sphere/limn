<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  sessionId: z.string().min(2).max(50),
}))

function onSubmit(values: any) {
    emit('submit', values)
}

const emit = defineEmits(['submit'])

</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          Connect to Session
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to the session</DialogTitle>
          <DialogDescription>
            Connect to collaborative session.
          </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="sessionId">
            <FormItem>
              <FormLabel>Session Id</FormLabel>
              <FormControl>
                <Input type="text" placeholder="XXX-XXX-XXX" v-bind="componentField" />
              </FormControl>
              <FormDescription>
                This is session ID you should recieve from your collaborator
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="dialogForm">
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>