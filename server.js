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
var querystring = require('querystring')

var postData = querystring.stringify({
    grant_type:'client_credentials'
})

var options = {
  hostname: 'https://oauth.reddit.com',
  port: 80,
  path: '/grants/installed_client',
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
