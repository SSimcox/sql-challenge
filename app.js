var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlEncoder = bodyParser.urlencoded({extended: false});
var route = require('./routes/routes');
var add = require('./routes/add');
var engine = require('ejs-mate');

app.use('/public',express.static('public'));
app.use(parseUrlEncoder);
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/add', add);
app.use('/', route);

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});