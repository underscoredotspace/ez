var request = require('request')
var accessToken = null

var newAccessToken = (cb) => {
  var options = {
    url: 'https://www.reddit.com/api/v1/access_token', 
    method: 'POST',
    form: {grant_type: 'client_credentials'},
    auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
  }

  request(options, function(err, response, body) {
    setTimeout(() => {
      accessToken = null
    }, Number(body.expires_in) * 1000)


    accessToken = body.access_token

    if (cb) {
      cb(accessToken)
    }
  })
}

var getAccessToken =() => {
  if (!accessToken) {
    newAccessToken((token)=>{
      return token
    })
  } else {
    return accessToken
  }
}

module.exports = {getAccessToken}