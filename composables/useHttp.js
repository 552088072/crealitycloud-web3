// import CODE from '@/assets/enum/code.js'
import { CURR_VERSION } from '@/assets/enum/index.js'

import { createUuid } from '@/utils/public'

import { useAgent } from '@/composables/useAgent'
import { useLang } from '@/composables/useLang'
import { useCookie, useRuntimeConfig , useFetch } from 'nuxt/app'

// 请求拦截器
function handleRequest({ options }) {
  // 获取设备信息相关
  const browserInfo = useAgent()
  let deviceId = useCookie('browser_device_id', {
    maxAge: 60 * 60 * 24 * 365 * 10 // 有效期 10 年
  })
  const cookieToken = useCookie('creality_token')
  const cookieUserId = useCookie('creality_user_id')
  if(!deviceId.value) {
    deviceId.value = createUuid()
  }

  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    __CXY_OS_VER_: browserInfo.os,
    __CXY_OS_LANG_: useLang(),
    __CXY_PLATFORM_: browserInfo.platformType,
    __CXY_BRAND_: browserInfo.engine,
    __CXY_APP_CH_: browserInfo.browser,
    __CXY_DUID_: deviceId.value,
    __CXY_TOKEN_: cookieToken.value || '',
    __CXY_UID_: cookieUserId.value || '',
    __CXY_JWTOKEN_: '',
    __CXY_APP_VER_: CURR_VERSION,
    __CXY_TIMEZONE_: new Date().getTimezoneOffset() / -60 * 3600
  }
}

// 响应拦截器
function handleResponse({ response }) {
  const { status } = response
  if(status === 200) {
    return response._data
  }else {
    return response
  }
}

/**
 * 创建请求方法
 * @param method
 */
async function createUseFetchRequest(method, url, params) {
  const { baseURL } = useRuntimeConfig().public

  const requestParams = {}
  if(method === 'POST') {
    requestParams.body = {
      ...params
    }
  }else {
    requestParams.query = {
      ...params
    }
  }

  const options = {
    baseURL,
    method,
    ...requestParams,
    onRequest: handleRequest,
    onResponse: handleResponse
  }
  let response
  let interfaceData
  let isClient = true
  try {
    if (import.meta.server) {
      response = await useFetch(url, options)
      isClient = false
    }else {
      interfaceData = await $fetch(url, options)
    }
  } catch (err) {
    const { status, statusText } = err
    interfaceData = {
      code: status,
      msg: statusText
    }
  }
  if(!isClient) {
    interfaceData = response.data
  }

  return interfaceData
}

// 提供 useFetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const useGet = (url, params) => createUseFetchRequest('GET', url, params)
export const usePost = 
  (url, params) => createUseFetchRequest('POST', url, params)