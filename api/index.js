/**
 * 获取配置信息
 */

export function getConfig() {
  return usePost('/api/cxy/v2/common/getConfig')
}

export function getConfig1() {
  return usePost('/api/cxy/v2/common/getConfig1')
}

export function dtcConfigApi(version = '') {
  return useGet('/api/cxy/account/v2/getDtcConfig', { version })
}