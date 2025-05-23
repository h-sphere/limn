<script setup>
import DefaultTheme from 'vitepress/theme'

import Limn from '../../components/Limn.vue'
import { Line } from '../../../src/primitives/Line'
import { Point } from '../../../src/primitives/Point'
import { Circle } from '../../../src/primitives/Circle'
import { Polygon } from '../../../src/primitives/Polygon'
import { CubicBezierCurve } from '../../../src/primitives/CubicBezierCurve'
import { GenerativeCollection } from '../../../src/primitives/GenerativeCollection'
import { computed } from 'signia'

const render = (r) => {



const c = r.center
const size = computed('size', () => Math.min(r.center.x, r.center.y))

const p = new Polygon(c, 12, computed('radius', () => 0.9 * size.value))
const points = p.points
const diagonals = points.map((p, i) => new Line(p, points.get((i + 4) % 12)))
const i = r.timer.infinite(3000, i => i)
const curvedDiagonals = diagonals.map(l => new CubicBezierCurve(l.p1, l.p2, l.lerp(i), new Line(l.p1, c).lerp(0.9)))

r.add(curvedDiagonals, {
    color: '#5d72b7',
    width: 4
})

  // console.log('RENDER ON THE MAIN PAGE!!!')
  // const t = r.timer.infinite(500, i => 5 + i * 20)
  // const n = 10
  // const distance = computed('distance', () => Math.min(r.center.x, r.center.y) / (n+3))
  // const angle = r.timer.infiniteForward(2000, i => i * 2 * Math.PI)
  // const p = r.center.add(100, 0).transform({ rotate: angle, origin: r.center })
  
  // const c = new GenerativeCollection(n, i => new Circle(new Line(p, r.center).lerp(i/n), computed('s', () => t.value + i * distance.value)))
  // r.add(c, {
  //     width: 5,
  //     strokeStyle: 'red'
  // })
}
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      
<Limn @render="render" />
    </template>
  </Layout>
</template>