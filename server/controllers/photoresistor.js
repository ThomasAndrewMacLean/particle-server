const Todo = require('../models').Todo;

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.data,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Todo
            .all()
            .then(todos => {
               
                res.render('testlist', {
                    title: 'Coolywoolie!',
                    todos
                });
            })
            .catch(error => res.status(400).send(error));
    },
};