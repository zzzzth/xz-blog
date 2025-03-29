export function getTalk (callback) {
  const jinrishici = require('jinrishici')
  jinrishici.load(result => {
    callback(result.data.content)
  })
}
