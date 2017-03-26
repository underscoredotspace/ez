// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var request = require('request')

app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

var reddit = {
  accessToken: null,
  newAccessToken: function(callback) {
    var options = {
      url: 'https://www.reddit.com/api/v1/access_token', 
      method: 'POST',
      form: {grant_type: 'client_credentials'},
      auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
    }
    request(options, function(err, response, body) {
      self = this
      setTimeout(() => {
        self.accessToken = null
      }, body.expires_in)
      this.accessToken = body.access_token
      if (callback) {
        callback(this.accessToken)
      }
    })
  },
  getAccessToken: () => {
    self = this
    if (!this.accessToken) {
      console.log(this)
      self.newAccessToken((token)=>{
        return token
      })
    } else {
      return this.accessToken
    }
  }
}

app.use('/login/callback', (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

app.get('/token', (req, res) => {
  res.send(reddit.getAccessToken())
})

app.get('hot', (req, res) => {
  
})

app.use(express.static('public'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});