// init project
var express = require('express');
var app = express();
var expressSession = require('express-session');

// cookies are used to save authentication
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({ secret:'getfucked', resave: true, saveUninitialized: true }));

var http = require('http')

var options = {
  hostname: 'https://www.reddit.com',
  path: '/api/v1/access_token',
  method: 'POST'
}

app.get('/', function(req, res) {
//   var req = http.request(options, (res) => {
    
//   })
  res.send('Ok');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
