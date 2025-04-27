<template>
  <div class="title">{{ $t('welcome') }}主页</div>
  <div class="text1">
    <div class="child-text2">主页内容1</div>
  </div>
  <div>主页内容2</div>
  <div>主页内容3</div>

  <div>主页内容4</div>
  <div>主页内容5</div>
  <!-- <div class="bgBox"></div> -->
  
  <div @click="test">请求</div>
  <div @click="test1">坏请求</div>
  <div @click="test2">GET请求</div>
</template>

<script setup>
import { getConfig, getConfig1, dtcConfigApi } from '@/api/index'
async function test() {
  const data = await getConfig()
  return data
}
test()
async function test1() {
  const data = await getConfig1()
  console.log('JYF--坏请求', data)
}

// const a = '222'

async function test2() {
  const data = await dtcConfigApi('21212')
  console.log('JYF--test2请求', data)
}
</script>

<style lang="scss" scoped>
.title {
  color: $theme;
}
.text1 {
  .child-text2 {
    font-size: var(--font-small);
  }
}
.bgBox {
  background: url("#{$img-cdn}home/contbg.jpg") no-repeat;
  background-size: cover;
  height: 100px;
}
</style>