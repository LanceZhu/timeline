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

const api = {
  getNickname,
  checkLogin
}

export default api
