var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/:request', function(req, res){
  var request = req.params.request;
  if(!isNaN(request)) {
    request = (+request) * 1000;
  }
  var date = new Date(request);
  
  date = new Date(date.getTime() + (new Date('January 1 1970') - new Date(0)));
  //res.send(date.toString())
  res.send({ unix: date.getTime() / 1000, natural: date.toLocaleString('en-US', {year: 'numeric', month: "long", day: "numeric"}) })
})

app.get('/', function(req, res) {
  res.send('./public/index.html');
});

app.listen(4567, function() {
  console.log('listening on port 4567...');
})