import DefaultTheme from 'vitepress/theme'
import LimnTheme from './LimnTheme.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: LimnTheme
}