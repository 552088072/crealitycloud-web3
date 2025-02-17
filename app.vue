<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale } = useI18n()
// 动态设置 <html> 标签的 lang 属性
useHead({
  htmlAttrs: {
    lang: locale.value
  }
})
</script>