import axios from 'axios'

async function getNickname (uid: string) : Promise<string> {
  const res = await axios.get(`/api/user/getNickname?uid=${uid}`)
  if (res.data.code !== 100) {
    console.error('getNickname err', res)
    return ''
  }
  return res.data.nickname
}

async function checkLogin () {
  const res = await axios.get('/api/user/checkLogin')
  return res.data.login
}

// 获取用户私信
async function checkMessage () {
  const res = await axios.get('/api/user/checkMessage')
  if (res.data.code !== 100) {
    return []
  }
  return res.data.message
}

// 获取用户 id
async function getUserId () {
  const logged = await checkLogin()
  if (!logged) {
    return
  }
  const res = await axios.get('/api/user/getDetail')
  const { id: userId } = res.data.data.mysql
  return userId
}

// 获取配置文件
export async function getConfig () {
  // const res = await axios.get('/api/config')
  const res = {
    tags: [
      {
        value: '默认',
        label: '默认'
      }
    ],
    preface: '一个前言',
    view: {},
    websiteName: '时间轴wiki'
  }
  return res
}

const api = {
  getNickname,
  checkLogin,
  checkMessage,
  getUserId
}

export default api
