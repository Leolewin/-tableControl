const express = require('express');
var path = require('path');

const app = express();
const port = 8001;

// app.set('views', path.join(__dirname, 'views'));

//set static folder
app.use(express.static(__dirname + '/public'));

// app.engine('.hbs', handlebars.engine);
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', '.hbs');

// app.get('/', function(req, res){
//   // res.send('home');
//   res.render('home');
// });

//500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render("505");
});
// app.use('/', express.static(__dirname + '/public', options));

app.get('/', function(req, res){
    res.sendfile('./index.html');
});

app.get('/init_data', function(req, res){
    const data = [
        {ID:"1", Name:"John Smith", Status:"Employed"},
        {ID:"2", Name:"Randal White", Status:"Employed"},
        {ID:"3", Name:"Leolewin", Status:"Employed"},
        {ID:"4", Name:"Steven Brown", Status:"Unemployed"},
        {ID:"1", Name:"John Smith", Status:"Employed"},
        {ID:"2", Name:"Randal White", Status:"Employed"},
        {ID:"3", Name:"Leolewin", Status:"Employed"},
        {ID:"4", Name:"Steven Brown", Status:"Unemployed"},
        {ID:"1", Name:"John Smith", Status:"Employed"},
        {ID:"2", Name:"Randal White", Status:"Employed"},
        {ID:"3", Name:"Leolewin", Status:"Employed"},
        {ID:"4", Name:"Steven Brown", Status:"Unemployed"}
    ];
    res.send(JSON.stringify(data));
})

app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
