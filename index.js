const express = require('express');
var path = require('path');

const app = express();
const port = 8001;

// app.set('views', path.join(__dirname, 'views'));

//set static folder
app.use(express.static(__dirname + '/public'));

// app.use('/', express.static(__dirname + '/public', options));

app.get('/', function(req, res){
    res.sendfile('./index.html');
});
app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
