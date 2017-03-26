var request = require('request')

var reddit = () => {
  this.accessToken = null
}

reddit.prototype.newAccessToken = (cb) => {
  var options = {
    url: 'https://www.reddit.com/api/v1/access_token', 
    method: 'POST',
    form: {grant_type: 'client_credentials'},
    auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
  }
  
  request(options, function(err, response, body) {
    setTimeout(() => {
      reddit.accessToken = null
    }, body.expires_in)
    
    reddit.accessToken = body.access_token
    
    if (cb) {
      cb(reddit.accessToken)
    }
  })
}

reddit.prototype.getAccessToken = () => {
  
}

module.exports = reddit

/*
var reddit = {
  accessToken: null,
  newAccessToken: function(callback) {

  },
  getAccessToken: () => {

  }
}
*/