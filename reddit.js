var request = require('request')
var _accessToken = null

var _newAccessToken = (cb) => {
  var options = {
    url: 'https://www.reddit.com/api/v1/access_token', 
    method: 'POST',
    form: {grant_type: 'client_credentials'},
    auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
  }

  request(options, function(err, response, body) {
    var oBody = JSON.parse(body)
    setTimeout(() => {
      _accessToken = null
    }, (Number(oBody.expires_in) * 1000) - 1000)
    
    _accessToken = oBody.access_token

    if (cb) cb(_accessToken)
  })
}

var access_token =(cb) => {
  if (!accessToken) {
    newAccessToken((token)=>{
      cb(accessToken)
    })
  } else {
    console.log({saved: accessToken})
    cb(accessToken)
  }
}

module.exports = {access_token}