
import { LANG } from '@/assets/enum/index'

import { getBrowserInfo } from '@/utils/userAgentUtil.js'

// 埋点中的  channel_from 外链属性 由于不熟悉逻辑暂未添加
export function useSensors(eventName, eventParams) {
  if (import.meta.server) return
  if(!window) return
  // 服务端执行的埋点 直接就不执行了
  const env = process.env.NODE_ENV

  const cookieUserId = useCookie('creality_user_id')
  const browserInfo = useAgent()

  const { browserName, browserVersion, osName, osVersion } = browserInfo
  // app_type 1-安卓   2-IOS   3-微信小程序   4-H5   5.web
  const globalParams =  {
    app_type: 5,
    event_time: Date.now() * 1,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    browser: browserName,
    browser_version: browserVersion,
    os: osName,
    os_version: osVersion
  }
  if(window.location &&  window.location.pathname) {
    const paths = window.location.pathname.split('/')
    let lang = LANG[paths[1].toUpperCase()]
    if (!lang) {
      lang = env === 'international' || env === 'preint' ? LANG.EN : LANG.ZH
    }
    globalParams.lang = lang
  }
  if(window.navigator && window.navigator.userAgent) {
    globalParams.user_agent = window.navigator.userAgent
  }
  if(cookieUserId.value) {
    globalParams.uid = cookieUserId.value
  }

  const params = {
    // 公共字段
    ...globalParams,
    // 自定义字段
    ...eventParams,
    event_time: Date.now() * 1
  }
  try {
    // 过滤掉无效的参数
    for (let p in params) {
      if (typeof params[p] === 'undefined' || params[p] === null) {
        delete params[p]
      }
    }
    // 向神策发送埋点数据
    sensors.track(eventName, params)
  }
  catch(err) {
    console.warn('神策埋点失败参数异常：', err)
  }
  finally {
    if (env === 'development' || env === 'testing') {
      console.log(`${eventName}埋点参数：`, params)
    }
  }
}