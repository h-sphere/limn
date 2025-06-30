export const line = `import { Line, computed } from 'limn'
const t = r.timer.infinite(4000, i => i * r.size.y / 2)
const width = computed(() => 5 + 20 * r.mousePos.x / r.size.x)
const pos = r.center.add(0, t).add(0, computed(() => -r.size.y / 4))
const line = new Line(pos, pos.add(100, 0))
r.add(line, {
    width,
    color: computed(() => \`hsl(\${Math.round(360 * r.mousePos.y / r.size.y)}deg 80% 40%)\`)
})
`