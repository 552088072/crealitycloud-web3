import { useColorMode } from '#imports'
import { computed } from 'vue'

export const useTheme = () => {
  const colorMode = useColorMode()

  const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  }

  return {
    isDark: computed(() => colorMode.preference === 'dark'),
    toggleTheme
  }
}
