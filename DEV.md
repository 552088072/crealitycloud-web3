
### 安装和环境  
  node >= v18.16.0  
  npm >= 9.5.1

  安装  
  `npx nuxi@latest init`  
  `npm i`

  启动  
  `npm run dev`

以上参考  [nuxt3-安装](https://nuxt.com.cn/docs/getting-started/installation)

### 项目搭建总体思路

## 1. 配置接口环境  
  参考 https://juejin.cn/post/7226756019753238583
   
  1. 根目录下新建 `.env` 文件 以及其他文件，比如 `.env.production`。
  2. package.json 设置启动项，比如  `nuxt build --dotenv .env.production`
  3. nuxt.config.ts 配置，比如：
  ```
    export default defineNuxtConfig({
      runtimeConfig: {
        public: {
          baseURL: process.env.BASE_URL;
        }
      }
    }) 
  ```


## 2. 封装公共请求
  详情见 @/composables/useHttp.js

## 3. 配置多语言
  多语言使用的是nuxt-i18n 详见 https://i18n.nuxtjs.org/docs/getting-started
  引入@nuxtjs/i18n `npm install @nuxtjs/i18n`

  ```
    export default defineNuxtConfig({
      modules: ['@nuxtjs/i18n'],
      i18n: {
        legacy: false,
        defaultLocale,
        lazy: true, 
        strategy: 'prefix_and_default',
        langDir: 'locales',
        locales: [
          { code: 'en',  files: ['en.js'] },  // files 支持多个文件引入
          { code: 'fr',  files: ['fr.js'] },
          { code: 'zh',  files: ['zh.js'] }
        ],
        detectBrowserLanguage: {
          useCookie: false    // 禁用 cookie
        }
      }
    })
  ```

## 4. 配置Sass
  引入Sass  `npm install sass sass-loader --save-dev`
  sass文档参考 https://github.com/sass/dart-sass/releases 

  ```
    // package.json 配置
    // sass 版本在sass2.0版本出来之前 先固定成v1.78.0 因为后面版本会报个警告
    "devDependencies": {
      "sass": "1.78.0",
      "sass-loader": "16.0.2" 
    }

    // nuxt.config.ts 配置
    // envCss 根据环境变量引入的css 根据业务来使用
    export default defineNuxtConfig({
      css: [
        // 公共的css
        '~/assets/scss/main.scss' 
      ],
      vite: {
        css: {
          preprocessorOptions: {
            // 全局的scss变量配置
            scss: {
              additionalData: `
                @import "~/assets/scss/variables.scss";
                @import "${envCss}";
              `
            }
          }
        }
      }
    }) 
  ```



