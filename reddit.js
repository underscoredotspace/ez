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
    var oBody = JSON.parse(body)
    setTimeout(() => {
      accessToken = null
    }, Number(oBody.expires_in) * 1000)
    
    accessToken = oBody.access_token

    if (cb) cb()
  })
}

var getAccessToken =() => {
  if (!accessToken) {
    // the problem here is that I'm not actually returning anything to getAccessToken
    newAccessToken(()=>{
      console.log({got: accessToken})
      return accessToken
    })
  } else {
    console.log({saved: accessToken})
    return accessToken
  }
}

module.exports = {getAccessToken}