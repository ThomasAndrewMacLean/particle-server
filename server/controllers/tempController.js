const Temp = require('../models').Temp;
const moment = require('moment');

module.exports = {
    create(req, res) {
        return Temp
            .create({
                title: req.body.data,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Temp
            .findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 1000
            })
            .then(todos => {

                todos = todos.map(t => {

                    return {
                        id: t.id,
                        createdAt: moment(t.createdAt).format('HH:mm:ss'),
                        title: t.title
                    };
                });

                res.render('testlist', {
                    title: 'Coolywoolie!',
                    todos
                });
            })
            .catch(error => res.status(400).send(error));
    },
    getData(req, res) {
        return Temp
            .findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 100
            })
            .then(todos => {

                todos = todos.map(t => {

                    return {
                        id: t.id,
                        createdAt: moment(t.createdAt).format('HH:mm:ss'),
                        title: t.title
                    };
                });

                res.status(200).json(todos);
            })
            .catch(error => res.status(400).send(error));
    },
};