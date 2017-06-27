// init project
var express = require('express')
var app = express()
var eztv = require('./reddit')

app.set('json spaces', 2);
app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

app.get(['/eztv', '/eztv/:page'], (req, res) => {
  let page
  
  if (req.params.hasOwnProperty('page')) {
    page = req.params.page
  }
  
  eztv.get(page)
  .then(eztv => {
    console.log('here')
    res.json(eztv.torrents)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500).json({err: err})
  })
})

app.use(express.static('public'),express.static('bower_components'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})