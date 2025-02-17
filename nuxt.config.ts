// https://nuxt.com.cn/docs/api/configuration/nuxt-config
// import i18n from "./locales"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const env = process.env.NODE_ENV

let defaultLocale = 'zh'
if (env === 'international' || env === 'preint') {
  defaultLocale = 'en'
}

function initCssImgHost() {
  if (env === 'production' || env === 'prepro') {
    return '~/assets/scss/pro.scss'
  } else if (env === 'international' || env === 'preint') {
    return '~/assets/scss/int.scss'
  } else {
    return '~/assets/scss/dev.scss'
  }
}
const envCss = initCssImgHost()

const metas = []
if (env === 'international') {
  const intMetas = [
    {
      name: 'google-site-verification',
      content: 'pqPpdcgB-t-LexROf8iG8opVtNQ5zMZR8V4bPciv_Bo'
    },
    { name: 'yandex-verification', content: 'ef10e47a92aac544' },
    {
      name: 'facebook-domain-verification',
      content: 'tjqcxyy2hywg4pi8boq6ystb1yvg4m'
    }
  ]
  metas.push(...intMetas)
}

// 接口实际请求地址
// const ActualRequestedAddress = {
//   development: 'http://api-dev.crealitycloud.cn',
//   prepro: 'https://admin-pre.crealitycloud.cn',
//   preint: 'https://admin-pre.crealitycloud.com',
//   production: 'https://api.crealitycloud.cn',
//   international: 'https://api.crealitycloud.com'
// }

// const DEV_PROXY = {
//   development: {
//     '/linkCreality': {
//       target: ActualRequestedAddress.preint,
//       headers: {
//         origin: ActualRequestedAddress.preint
//       },
//       pathRewrite: {
//         '^/linkCreality': ''
//       }
//     }
//   },
//   production: {
//     '/linkCreality': {
//       target: ActualRequestedAddress.international,
//       headers: {
//         origin: ActualRequestedAddress.international
//       },
//       pathRewrite: {
//         '^/linkCreality': ''
//       }
//     },
//     '/api': { target: 'http://172.16.20.55', xfwd: false }
//   },
//   international: {
//     '/linkCreality': {
//       target: ActualRequestedAddress.production,
//       headers: {
//         origin: ActualRequestedAddress.production
//       },
//       pathRewrite: {
//         '^/linkCreality': ''
//       }
//     },
//     '/api': { target: 'http://172.22.255.176', xfwd: false }
//   },
//   prepro: {
//     '/linkCreality': {
//       target: ActualRequestedAddress.preint,
//       headers: {
//         origin: ActualRequestedAddress.preint
//       },
//       pathRewrite: {
//         '^/linkCreality': ''
//       }
//     },
//     '/api': { target: 'http://127.0.0.1:18888', xfwd: false }
//   },
//   preint: {
//     '/linkCreality': {
//       target: ActualRequestedAddress.prepro,
//       headers: {
//         origin: ActualRequestedAddress.prepro
//       },
//       pathRewrite: {
//         '^/linkCreality': ''
//       }
//     },
//     '/api': { target: 'http://127.0.0.1:18888', xfwd: false }
//   }
// }

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // 配置本地访问链接
  devServer: {
    host: '0.0.0.0',
    port: 3300
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  },
  nitro: {
    // devProxy: DEV_PROXY[env]
  },
  app: {
    head: {
      title: 'CREALITY CLOUD - The All-in-One 3D Printing Platform',
      meta: [
        { name: 'referrer', content: 'no-referrer' },
        { name: 'expires', content: 'Wed,01 Jan 2025 00:00:00 GMT' },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,maximum-scale=5.0'
        },
        {
          name: 'p:domain_verify',
          content: '37eeba1d235393b86b05e09ae7bda18d'
        },
        ...metas
      ]
    }
  },
  plugins: [
    { src: 'plugins/sensorsdata.js', mode: 'client' }
  ],
  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system', // 默认值为 'system'
    fallback: 'light', // 如果未找到系统首选项，则回退到 'light'
    dataValue: 'theme'
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  i18n: {
    legacy: false,
    defaultLocale,
    lazy: true,
    strategy: 'prefix_and_default',
    langDir: 'locales',
    locales: [
      { code: 'en', files: ['en.js'] }, // files 支持多个文件引入
      { code: 'fr', files: ['fr.js'] },
      { code: 'zh', files: ['zh.js'] }
    ],
    detectBrowserLanguage: {
      useCookie: false // 禁用 cookie
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/scss/variables.scss";
            @import "${envCss}";
          `
        }
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    ssr: {
      // 防止element-plus在ssr时报错 如果有其他 Element Plus 相关包，也可以一起添加
      noExternal: [
        'element-plus', 
        '@element-plus/icons-vue'
      ] 
    }
  },
  css: [
    '~/assets/scss/main.scss', 
    '~/assets/scss/flex.scss', 
    '~/assets/scss/root.scss',
    '~/assets/scss/theme.scss',
    'element-plus/theme-chalk/dark/css-vars.css'
  ]
})