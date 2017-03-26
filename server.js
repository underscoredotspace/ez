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

var http = require('https')
var querystring = require('querystring')

var getToken_options = {
  
}

app.get('/', function(req, res) {
//   var req = https.request(options, (res) => {
    
//   })
  res.send('Ok');
});

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
