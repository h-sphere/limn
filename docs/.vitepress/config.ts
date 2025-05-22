import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bristle",
  description: "Reactive Geometry Framework",
  themeConfig: {
    aside: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Get Started', link: '/get-started' },
        ]
      },
      {
        text: 'Shapes',
        items: [
          { text: 'Point', link: '/shapes/point' },
          { text: 'Line', link: '/shapes/line' },
          { text: 'Rectangle', link: '/shapes/rectangle' },
          { text: 'Circle', link: '/shapes/circle' },
          { text: 'Polygon', link: '/shapes/polygon' },
          { text: 'Bezier Curves', link: '/shapes/bezier-curve' }

        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Timers', link: '/advanced/timers' },
          { text: 'Interactivity', link: '/advanced/interactivity'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/h-sphere/bristle' }
    ]
  }
})
