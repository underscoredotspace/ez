var request = require('request')

function Reddit() {
  this.accessToken = null
}

Reddit.prototype.newAccessToken = (cb) => {
  var options = {
    url: 'https://www.reddit.com/api/v1/access_token', 
    method: 'POST',
    form: {grant_type: 'client_credentials'},
    auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
  }
  
  request(options, function(err, response, body) {
    setTimeout(() => {
      this.accessToken = null
    }, body.expires_in)
    
    this.accessToken = body.access_token
    
    if (cb) {
      cb(this.accessToken)
    }
  })
}

Reddit.prototype.getAccessToken = () => {
  if (!this.accessToken) {
    this.newAccessToken((token)=>{
      return token
    })
  } else {
    return this.accessToken
  }
}

var r = new Reddit
console.log(r)

module.exports = r

/*
var reddit = {
  accessToken: null,
  newAccessToken: function(callback) {

  },
  getAccessToken: () => {

  }
}
*/