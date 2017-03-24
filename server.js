
var passport = require('passport')
var oauth2 = require('passport-oauth2').Strategy

passport.use(new oauth2({
    authorizationURL: 'https://www.reddit.com/api/v1/authorize?scope=read&state=loggedin21',
    tokenURL: 'https://www.reddit.com/api/v1/access_token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://understood-bird.glitch.me/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile)
    return cb(null, profile);
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

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
app.use(passport.initialize());
app.use(passport.session());

// index route
app.get('/', function(req, res) {
  res.send('<a href="/auth">Log in</a>');
});

// on clicking "logoff" the cookie is cleared
app.get('/logoff',
  function(req, res) {
    req.logout();
    res.clearCookie('twitter-passport-example');
    res.redirect('/');
  }
);

app.get('/auth', passport.authenticate('oauth2'));

app.get('/auth/callback', function(req, res) {
    if (!req.query.error) {
      console.log(req.query.code)
      res.json({loggedin: true})
    } else {
      res.json({error: req.query.error})
    }
  }
);

// on successful auth, a cookie is set before redirecting
// to the success view
app.get('/setcookie',
  function(req, res) {
    res.cookie('twitter-passport-example', new Date());
    res.redirect('/success');
  }
);

// if cookie exists, success. otherwise, user is redirected to index
app.get('/success',
  function(req, res) {
    if(req.cookies['twitter-passport-example']) {
      res.send('<a href="/logoff">Log out</a>');
    } else {
      res.json({success: false});
    }
  }
);

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
