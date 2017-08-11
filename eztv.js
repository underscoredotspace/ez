// var request-promise = require('request-promise-native')
const request = require('https')

function get(page = 1, limit = 50) {
  return new Promise((resolve, reject) => {
    const url = `https://eztv.ag/api/get-torrents?limit=${limit}&page=${page}`

    request.get(url, res => {
      console.log(res)
      if (res.statusCode !== 200) {
        reject(res.status)
      } else {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          resolve(JSON.parse(rawData))
        })
      }
    })
  })
}

module.exports = {get}