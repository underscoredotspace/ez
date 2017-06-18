// var request-promise = require('request-promise-native')
const request = require('request')

function getLatest() {
  return new Promise((resolve, reject) => {
    const options = {url: 'https://eztv.ag/api/get-torrents?limit=100&page=1'}

    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body)) 
      }
    })
  })
}

module.exports = {getLatest}