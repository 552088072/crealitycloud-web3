// 生成唯一id
export function createUuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export const isArray = Array.isArray
export const isFunction = (val) => typeof val === 'function'
export const isString = (val) => typeof val === 'string'
export const isBoolean = (val) => typeof val === 'boolean'
export const isObject = (val) => val !== null && typeof val === 'object'