<template>
  <div class="top-header flex-item-center">
    <NuxtLink v-if="!$isInt" class="print-service-link" :to="printServiceUrl" target="_blank">
      <i class="iconfont">&#xe603;</i>
      打印服务
    </NuxtLink>
    <div v-else>
    </div>
    <div class="top-right">
      <el-button type="success">
        <el-icon><Edit /></el-icon> 编辑
      </el-button>

      <CompThemeSwitch />
    </div>
  </div>
</template>
<script setup>
import { Edit } from '@element-plus/icons-vue'
import CompThemeSwitch from '@/components/comp-weight/ThemeSwitch.vue'

import { PRODUCT_WEBSITE } from '@/assets/enum/env.js'

const env = process.env.NODE_ENV
const printServiceUrl = PRODUCT_WEBSITE[env].h5 + 'print-service-publicize'
const { $isInt } = useNuxtApp()

</script>
<style scoped lang='scss'>
.top-header {
  background: $black;
  height: 32px;
  color: $white;
  padding: 0 20px;
  line-height: 1;
  font-size: var(--font-small);
  .print-service-link {
    color: $white; 
    text-decoration: none;
  }
}
.top-header {
  padding: 0 40px;
}
</style>
