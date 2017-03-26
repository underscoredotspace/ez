// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//var snoowrap = require('snoowrap')
var request = require('request')

var form = {
  grant_type: 'client_credentials',
  redirect_uri:'https://understood-bird.glitch.me/reddit',
}

// var url = form.redirect_uri
var url = 'https://www.reddit.com/api/v1/access_token'
var auth = {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET, 'sendImmediately': false}
/*
const r = new snoowrap({
  userAgent: 'snoowrap-test',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: 'put your refresh token here'
});
*/

app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('<title>Test Page</title><body>Nothing to see here</body>');
  request.post({url: url, form: form, auth: auth}), function(err, res, body) {
    console.log(res)
  }
});

app.use('/reddit', bodyParser.json(), (req, res) => {
  res.json({body: 'yes'})
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
