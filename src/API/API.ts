import axios from 'axios'

async function getNickname (uid: string) : Promise<string> {
  const res = await axios.get(`/api/user/getNickname?uid=${uid}`)
  if (res.data.code !== 100) {
    console.error('getNickname err', res)
    return ''
  }
  return res.data.nickname
}

const api = {
  getNickname
}

export default api
