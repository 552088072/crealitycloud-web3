// 获取浏览器给的 userAgent 信息
export function getUserAgent() {
  if (import.meta.server) {
    // 如果在服务端，使用 useRequestHeaders 获取请求头
    const headers = useRequestHeaders([ 'user-agent' ])
    return headers['user-agent'] || 'Unknown User-Agent'
  } else if (import.meta.client) {
    // 如果在客户端，通过 navigator.userAgent 获取
    return navigator.userAgent || 'Unknown User-Agent'
  }
  return 'Unknown User-Agent'
}
