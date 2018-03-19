const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const todoController = require('./server/controllers/todo');
const photoresistorController = require('./server/controllers/photoresistor');
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

app.get('/home', (req, res) => {

    res.render('index', {
        title: 'Coolywoolie!'
    });
});

app.get('/test', todoController.list);

app.post('/todo', todoController.create);

app.post('/photoresistor', photoresistorController.create);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome'
}));



module.exports = app;