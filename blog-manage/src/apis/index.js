import axios from 'axios'
// const host = 'http://localhost:3001'
var host = 'http://47.98.146.104:4001'

const ajax = (url, params, method) => {
  return axios({
      method: method || 'post',
      url: host + url,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      // debugger
      if (res.status === 200 && res.data.code === 200) {
        return res.data
      }
    })
    .catch(err => err)
}

export {
  ajax
}