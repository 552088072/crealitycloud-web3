<template>
  <!-- 默认的全局 布局模式 -->
  <main 
    :class="[
      isH5 && 'isH5', 
      isPad && 'isPad', 
      isWeb && 'isWeb', 
      isBig && 'isBig'
    ]"
  >
    <WebHeader v-if="!isH5" />
    <H5Header v-else />
    <slot></slot>
    <div>
      <div v-if="isH5">
        <p>This is mobile view</p>
      </div>
      <div v-else-if="isPad">
        <p>This is iPad view</p>
      </div>
      <div v-else-if="isWeb">
        <p>This is web view</p>
      </div>
      <div v-else>
        <p>This is big screen view</p>
      </div>
    </div>
  </main>
  <footer>脚部</footer>
</template>

<script setup>
// import { useMediaQuery } from '@vueuse/core'
// import { ref, onMounted } from 'vue'
import H5Header from '@/components/comp-header/h5-header'
import WebHeader from '@/components/comp-header/web-header'
const { isH5, isPad, isWeb, isBig } = useResponsive()

// const agent = useAgent()
</script>

<style>
</style>