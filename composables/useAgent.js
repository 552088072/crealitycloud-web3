import UAParser from 'ua-parser-js'

import { getUserAgent } from '@/utils/userAgentUtil.js'

// import { useMediaQuery } from '@vueuse/core'
// import { ref, onBeforeMount   } from 'vue'

// const browserInfo = ref(null)
// 设备信息
export function useAgent() {
  const userAgent = getUserAgent()
  // 创建 UAParser 实例
  const parser = new UAParser()
  const result = parser.setUA(userAgent)
  let isAndroid = false
  let isIOS = false
  let isMac = false
  let osName = ''
  // platform 给后端的平台 这里只需要知道web是2  H5是4就行了。
  // 因为这里打算web和H5要做成一个项目所以2 和 4都要
  let platformType = 2
  let isApp = false
  if(result) {
    const getResult = result.getResult()
    // 浏览器  cpu  设备（只有在App上才有值） 引擎  系统  userAgent
    const { browser, cpu, device, engine, os , ua } = getResult
    const browserInfo = browser.name + ' ' + browser.version

    if(os && os.name) {
      osName = os.name.toLowerCase()
    }
    isAndroid = osName.includes('android')
    isIOS = osName.includes('ios')
    isMac = osName.includes('mac')
    if (isIOS || isAndroid) {
      platformType = 4
      isApp = true
    }
    return {
      browser: browserInfo,
      browserName: browser.name,
      browserVersion: browser.version,
      cpu: cpu.architecture,
      device,
      engine: engine.name + ' ' + engine.version,
      os: os.name + ' ' + os.version,
      osName: os.name,
      osVersion: os.version,
      isAndroid,
      isIOS,
      isMac,
      isApp,
      platformType
    }
  } else {
    return {
      browser: '',
      browserName: '',
      browserVersion: '',
      cpu: '',
      device: '',
      engine: '',
      os: '',
      osName: '',
      osVersion: '',
      isAndroid,
      isIOS,
      isMac,
      isApp,
      platformType
    }
  }
}

// export function useAgent() {
//   if(!browserInfo.value) {
//     browserInfo.value = getAgent()
//   }
//   return browserInfo.value
// }
