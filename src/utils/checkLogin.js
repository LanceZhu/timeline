import Axios from 'axios'
async function checkLogin () {
  const res = await Axios.get('/api/checkLogin')
  return res.data.login
}

export default {
  checkLogin
}
