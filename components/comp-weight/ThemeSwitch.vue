<template>
  <ClientOnly>
    <el-switch
      v-model="isDark"
      size="small"
      aria-label="切换暗色主题"
      @change="() => toggleTheme()"
    >
      <template #active-action>
        <i class="dark iconfont">&#xe62d;</i>
      </template>
      <template #inactive-action>
        <i class="light iconfont">&#xe61f;</i>
      </template>
    </el-switch>
  </ClientOnly>
</template>

<script setup>
// import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped lang='scss'>
:deep(.el-switch__core) {
  --el-switch-on-color: var(--bg-color-mute);
  --el-switch-off-color: var(--bg-color-mute);
  --el-switch-border-color: var(--border-color);
  .light{
    color: black;
  }
  .el-switch__action {
    background-color: transparent;
  }
  .dark{
    color: white;
  }
}
</style>
