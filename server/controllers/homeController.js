const Todo = require('../models').Todo;
const Temp = require('../models').Temp;

const moment = require('moment');

module.exports = {
    list(req, res) {
        let todos = Todo.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 100
        });

        let temps = Temp.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 100
        });
        Promise.all([todos, temps])
            .then(results => {

                // console.log(todos);

                todos = results[0].map(t => {

                    return {
                        id: t.id,
                        createdAt: moment(t.createdAt).format('HH:mm:ss'),
                        title: t.title
                    };
                });


                temps = results[1].map(t => {
                    console.log(t);

                    return {
                        id: t.id,
                        createdAt: moment(t.createdAt).format('HH:mm:ss'),
                        title: (t.title / 5)
                    };
                });
                console.log('todos: ' + todos.length);

                console.log('temps: ' + temps.length);
                res.render('index', {
                    title: 'Particle-data-collector 2000!',
                    todos,
                    temps
                });
            })
            .catch(error => res.status(400).send(error));
    }
};