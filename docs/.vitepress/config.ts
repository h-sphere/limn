import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Limn",
  description: "Reactive Geometry Framework",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    aside: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Explorer', link: 'http://limn.hypersphere.blog/explorer/'}
    ],
    logo: '/logo.svg',
    siteTitle: '',

    sidebar: [
      {
        text: 'Concepts',
        collapsed: true,
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Basic Concepts', link: '/basic-concepts' },
          { text: 'Shapes vs Renderers', link: '/shapes-vs-renderers' }
        ]
      },
      {
        text: 'Shapes',
        collapsed: true,
        items: [
          { text: 'Point', link: '/shapes/point' },
          { text: 'Line', link: '/shapes/line' },
          { text: 'Rectangle', link: '/shapes/rectangle' },
          { text: 'Path', link: '/shapes/path' },
          { text: 'Circle', link: '/shapes/circle' },
          { text: 'Polygon', link: '/shapes/polygon' },
          { text: 'Text', link: '/shapes/text' },
          { text: 'Bezier Curves', link: '/shapes/bezier-curve' },
          { text: 'Reactive Array', link: '/shapes/reactive-array'},
          { text: 'Generative Collection', link: '/shapes/generative-collection'},
          { text: 'Layer', link: '/shapes/layer' },
          { text: 'Image', link: '/shapes/image' },
          { text: 'Video', link: '/shapes/video' },


        ]
      },
      {
        text: 'Fills',
        collapsed: true,
        items: [
          { text: 'Linear Fill', link: '/fills/linearFill' },
          { text: 'Radial Fill', link: '/fills/radialFill' },
          { text: 'Conic Fill', link: '/fills/conicFill' },
          { text: 'Layer Fill', link: '/fills/layerFill' },

        ]
      },
      {
        text: 'Advanced',
        collapsed: true,
        items: [
          { text: 'Timers', link: '/advanced/timers' },
          { text: 'Interactivity', link: '/advanced/interactivity'}
        ]
      },
      {
        text: 'Demos',
        collapsed: true,
        items: [
          { text: 'Circles', link: 'demos/circles' },
          { text: 'Lines Intersection', link: 'demos/lines-intersection' },
          { text: 'Circles Intersection', link: 'demos/circles-intersection' },
          { text: 'Cardioid', link: 'demos/cardioid' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/h-sphere/limn' }
    ]
  }
})
