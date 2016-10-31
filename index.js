/**
 * Created by I335614 on 10/27/2016.
 */
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars').create({defaultLayout: 'main', extname : '.hbs'});
const app = express();
const port = 9999;

app.use(express.static(__dirname + '/public'));

app.engine('.hbs', handlebars.engine);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', '.hbs');

app.get('/', function(req, res){
  // res.send('home');
  res.render('home');
});

//500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render("505");
});

app.listen(port, '127.0.0.1', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
