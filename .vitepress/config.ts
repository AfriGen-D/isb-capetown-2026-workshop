import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import taskLists from 'markdown-it-task-lists'

export default withMermaid(defineConfig({
  title: 'ISB Cape Town 2026 -- AfriGen-D Tutorial',
  description:
    'Hands-on tutorial for genotype imputation and data analysis using ' +
    "AfriGen-D's curated African genomic resources. 19th Annual " +
    'International Biocuration Conference, Cape Town, April 2026.',
  base: '/isb-capetown-2026-workshop/',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'CLAUDE.md'],

  head: [
    ['link', { rel: 'icon', href: '/isb-capetown-2026-workshop/afrigen-d-logo.png' }],
    ['meta', { name: 'theme-color', content: '#C94234' }],
  ],

  themeConfig: {
    logo: '/afrigen-d-logo.png',
    siteTitle: 'ISB Cape Town 2026',

    // "On this page" right-hand outline: include H2 + H3
    // so long pages (notably /tutorial) expose subsections
    // like "2.1 Creating an Account", "Exercise 1", etc.
    // rather than collapsing everything into top-level H2s.
    outline: [2, 3],
    outlineTitle: 'On this page',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Background',
        items: [
          { text: 'Theory: diversity, panels, biocuration', link: '/theory' },
          { text: 'Genotype imputation (how it works)', link: '/imputation' },
          { text: 'Services & Panels (in-depth)', link: '/services' },
        ],
      },
      { text: 'Workflow', link: '/workflow' },
      { text: 'Tutorial', link: '/tutorial' },
      { text: 'AGMP', link: '/agmp' },
      { text: 'AGVD', link: '/agvd' },
      { text: 'Schedule', link: '/schedule' },
      { text: 'Venue', link: '/venue' },
    ],

    sidebar: [
      {
        text: 'Workshop Info',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Schedule', link: '/schedule' },
          { text: 'Venue', link: '/venue' },
        ],
      },
      {
        text: 'Background (30 min theory)',
        items: [
          { text: 'African diversity, panels, biocuration', link: '/theory' },
          { text: 'Genotype imputation (how it works)', link: '/imputation' },
          { text: 'Imputation services & panels (in-depth)', link: '/services' },
        ],
      },
      {
        text: 'Hands-on Workflow',
        items: [
          { text: 'Per-step checklists (all 6 slots)', link: '/workflow' },
          { text: 'Genotype Imputation (full tutorial)', link: '/tutorial' },
          { text: 'AGMP (pharmacogenomic variants)', link: '/agmp' },
          { text: 'AGVD (population frequencies)', link: '/agvd' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/AfriGen-D/isb-capetown-2026-workshop',
      },
    ],

    footer: {
      message:
        'Hands-on tutorial delivered at the 19th Annual International ' +
        'Biocuration Conference, Cape Town 2026. Part of the AfriGen-D ' +
        'training programme.',
      copyright: 'Copyright &copy; 2026 AfriGen-D Project',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern:
        'https://github.com/AfriGen-D/isb-capetown-2026-workshop/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'medium' },
    },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => {
      md.use(taskLists, { enabled: false, label: true })
    },
  },
}))
