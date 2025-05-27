import { LimnRenderer } from "./canvas/Renderer"

const canvas = document.querySelector<HTMLCanvasElement>('#app')!

const ctx = canvas.getContext('2d')!

const renderer = new LimnRenderer(ctx).fitScreen()

renderer.watch()