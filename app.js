const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const photoresistorController = require('./server/controllers/photoresistor');
const tempController = require('./server/controllers/tempController');
const app = express();

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/ping', (req, res) => {
    res.status(200).json({
        alive: true
    });
});

app.get('/home', (req, res) => {
    res.render('index', {
        title: 'Coolywoolie!'
    });
});

app.get('/licht', photoresistorController.getData);
app.get('/temp', tempController.getData);

app.post('/photoresistor', photoresistorController.create);
app.post('/temp', tempController.create);


app.get('*', (req, res) => {

    res.render('index', {
        title: 'iot'
    });
});



module.exports = app;