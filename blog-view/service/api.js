import axios from 'axios'
import md5 from 'crypto-md5'
import { local, appId } from '~/plugins/util'

// 获取服务器时间戳
let serviceFlag = false
let timestamp = ''

function getServiceTimestamp() {
  return axios({
    method: 'post',
    url:
      'https://apiuat.sgsonline.com.cn/ticLeads/business/api.v2.basic/SysAttrConfigAction/getTime'
  })
    .then(res => {
      serviceFlag = true
      timestamp = res.data.data.timestamp
      // 获取到服务器时间戳每隔5s刷新一次时间戳
      setInterval(() => {
        timestamp += 5000
      }, 5000);
      return timestamp
    })
    .catch(error => {
      return error
    })
}

// head签名
async function headSing(params, options) {
  let pid = ''
  let pcode = ''
  // sso
  if (options === 'ticSso') {
    pid = 'pid.bbc'
    pcode = 'aq2s2ASdsqoa9U80'
  } else {
    pid = 'pid.leads'
    pcode = 'saUqq8AHsS7kQH8s'
  }
  const pmd5 = md5((pid + pcode).toUpperCase(), 'hex')
  const param = JSON.stringify(params) + pmd5.toUpperCase()
  if (!serviceFlag) timestamp = await getServiceTimestamp()
  const sign = md5(param + timestamp, 'hex')
  let sgsToken = local.get('token') && local.get('token').token || ''
  const headers = {
    pid,
    sign,
    timestamp,
    appId,
    sgsToken
  }
  return headers
}

const api = (params, url, method = 'post', options) => {
  console.log(url)
  let host = 'https://apiuat.sgsonline.com.cn'
  const axiosParam = {
    method,
    url: host + url,
    data: params,
    headers: {}
  }
  return headSing(params, options).then(res => {
    axiosParam.headers = res
    // 不携带sgsToken， appId （获取code,登录）
    if (url.indexOf('/authorize') > -1 || url.indexOf('/login') > -1) {
      delete axiosParam.headers.sgsToken
      delete axiosParam.headers.appId
    }
    console.log(axiosParam)
    return axios(axiosParam).then(res => {
      // console.log(res)
      return res.data
    }).catch(error => {
      return error
    })
  }).catch(error => {
    return error
  })
}
export default api
