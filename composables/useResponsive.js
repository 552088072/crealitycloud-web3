// 用来动态计算当前页面媒体查询状态
// 服务端时 只有 isH5 和 isWeb
import { useMediaQuery } from '@vueuse/core'
import { ref, onMounted, computed } from 'vue'

export function useResponsive(queries = {}) {
  // console.log('useAgent()', useAgent())
  const { isApp } = useAgent()
  const isHydrated = ref(false)
  onMounted(() => {
    isHydrated.value = true
  })

  // 使用 useMediaQuery 创建响应式状态
  const mobileQuery = useMediaQuery(queries.mobile || '(max-width: 750px)')
  const padSizeQuery = useMediaQuery(queries.pad || '(min-width: 751px) and (max-width: 1024px)')
  const webSizeQuery = useMediaQuery(queries.web || '(min-width: 1024px) and (max-width: 1920px)')
  const bigSizeQuery = useMediaQuery(queries.big || '(min-width: 1920px)')

  // 使用计算属性返回响应式状态
  const isH5 = computed(() => isHydrated.value ? mobileQuery.value : isApp )
  const isPad = computed(() => isHydrated.value ? padSizeQuery.value : false)
  const isWeb = computed(() => isHydrated.value ? webSizeQuery.value : !isApp)
  const isBig = computed(() => isHydrated.value ? bigSizeQuery.value : false)
  return {
    isH5,
    isPad,
    isWeb,
    isBig
  }
}
