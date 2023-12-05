type F = (...args: number[]) => void

function debounce(fn: F, t: number): F {
  let timer: any 
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(null, args)
    }, t)
  }
};