import { reactive } from 'vue'
import { start } from '../demos'

export const config = reactive({
  layout: 'horizontal',
  pause: false,
  autoRun: false,
  currentCode: {
    code: start
  },
  runCurrentCode: () => {
    console.log('not implemented')
  }
})