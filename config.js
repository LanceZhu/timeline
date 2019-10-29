module.exports = {
  baseURL: process.env.NODE_ENV === 'production' ? '' : '',
  urlPrefix: process.env.NODE_ENV === 'production' ? '/api' : '/'
}
