export default defineNuxtPlugin((nuxtApp) => {

  // 定义全局变量
  const isInt = process.env.NODE_ENV === 'international' ||
    process.env.NODE_ENV === 'preint'
  nuxtApp.provide('isInt', isInt)
})