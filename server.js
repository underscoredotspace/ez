// init project
var express = require('express')
var app = express()

var reddit = require('raw.js')

app.use((req, res))
app.get('/', (req, res) => {
  res.send('Ok');
});

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
