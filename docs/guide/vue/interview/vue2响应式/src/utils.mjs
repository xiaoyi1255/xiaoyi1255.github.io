export function isObject(value) {
  return value !== null && typeof value === 'object'
}
export const hasProto = '__proto__' in {}

export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    enumerable: !!enumerable,
    configurable: true,
    writable: true,
    value
  })
}

export function parsePath(path) {
  if (!path) return noop

  const segments = path.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
