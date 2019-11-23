const isJSON = str => {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      if (str.indexOf('{') !== -1) {
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  } else {
    return false
  }
}

export default isJSON
