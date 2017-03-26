// init project
var express = require('express')
var app = express()
//var snoowrap = require('snoowrap')
var https = require('https')

var req = {
  hostname: 'https://www.reddit.com',
  path: '/api/v1/authorize'
*/

var options = {
  client_id: process.env.CLIENT_ID,
  response_type:'code',
  state:'test',
  redirect_uri:'',
  duration:'permanent',
  scope:'read'
}

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
});

app.post('/reddit', (req, res) => {
  
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
