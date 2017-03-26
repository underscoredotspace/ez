// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//var snoowrap = require('snoowrap')
var request = require('request')

var querystring = {
  client_id: process.env.CLIENT_ID,
  response_type:'code',
  state:'fdsafd',
  redirect_uri:'https://understood-bird.glitch.me/reddit',
  duration:'permanent',
  scope:'read'
}

var url = 'https://www.reddit.com/api/v1/authorize'

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
  request.get({url: url, qs: querystring}), (err, res, body) => {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
}
});

app.use('/reddit', bodyParser.json(), (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
