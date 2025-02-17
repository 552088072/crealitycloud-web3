
import { LANG } from '@/assets/enum/index.js'
export function useLang() {
  const { locale } = useI18n()
  const lang = LANG[locale.value.toUpperCase()]
  return lang
}