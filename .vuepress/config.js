const { description } = require('../package')

module.exports = {
  title: '精通比特币SV',
  description: '改写自精通比特币第二版，原版权属于原作者',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // theme: 'vdoing',
  // themeConfig: {
  //   sidebar: 'structuring' //  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义
  // },
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
    ],
    sidebar: {
      "/": [
        "",
        "glossary.md",
        "ch01.md",
        "ch02.md",
        "ch03.md",
        "ch04.md",
        "ch05.md",
        "ch05a.md",
        "ch06.md",
        "ch06a.md",
        "ch07.md",
        "ch08.md",
        "ch09.md",
        "ch10.md",
        "ch11.md",
        "ch12.md",
        "appdx-bitcoinwhitepaper.md",
        "bitcoin-whitepaper-cn.md",
        "appdx-scriptops.md",
        "appdx-bips.md",
        "appdx-bitcore.md",
        "appdx-pycoin.md",
        "appdx-bx.md",
        "second_edition_changes.md",
        "README-ytm2nd.md",
        "preface.md",
        "cn-preface.md",
        "trans-preface.md",
        "SUMMARY.md"
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-table-of-contents',
    'latex',
    'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
  ],

  markdown: {
    extendMarkdown: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-texmath'))
    }
  }
}
