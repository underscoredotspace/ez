// var request-promise = require('request-promise-native')
const request = require('request')

function get(page = 1, limit = 20) {
  return new Promise((resolve, reject) => {
    const options = {url: `https://eztv.ag/api/get-torrents?limit=${limit}&page=${page}`}

    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body)) 
      }
    })
  })
}

module.exports = {get}