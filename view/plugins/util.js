const local = {
  set(key, val) {
    if(window) typeof val == 'string' ? window.localStorage.setItem(key, val) : window.localStorage.setItem(key, JSON.stringify(val))
  },
  get(key) {
    if(window) {
    let val = window.localStorage.getItem(key)
    return typeof val == 'string' ? JSON.parse(val) : val
  }
  },
  clear() {
    window.localStorage.clear()
  },
  remove(key) {
    window.localStorage.removeItem(key)
  }
}

const appId = '23781721'

export {
  local,
  appId
}