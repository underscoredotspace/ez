// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var request = require('request')

var options = {
  url: 'https://www.reddit.com/api/v1/access_token', 
  form: {grant_type: 'client_credentials'}
}
var auth = {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}

app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  request.post({url: url, body: form, auth: auth}), function(err, res, body) {
    res.send(body)
  }
});

app.use('/reddit', (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
var request = require("request");

var options = { 
method: 'POST',
  url: 'https://www.reddit.com/api/v1/access_token',
  
  headers: 
   {
     'content-type': 'application/x-www-form-urlencoded',
     authorization: 'Basic ZDNIU2NZRThCR0dBY2c6eTNsN3RFWHcxMG1uTzdmUHV0aW1vYjBTWFBv' },
  form: { grant_type: 'client_credentials' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

*/