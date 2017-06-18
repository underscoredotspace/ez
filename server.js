// init project
var express = require('express')
var app = express()
var r = require('./reddit')

app.set('json spaces', 2);
app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

app.get('/eztv', (req, res) => {
  r.getLatest().then(eztv => 
      res.json(eztv.data.children)
  }).catch(err => res.sendStatus(500).json({err: err}))
})

app.use(express.static('public'),express.static('bower_components'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})