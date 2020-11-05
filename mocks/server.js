const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3031
const formidable = require('formidable')

server.use(middlewares)
// server.use(router)
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}/`)
})

const translations = require('./data/translations.json')

server.get('/translations/:locale', (req, res) => {
    res.send(translations[req.params.locale])
})

const authUser = require('./data/authUser.json')

server.post('/me/register', (req, res) => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    authUser.expired = date.toISOString()
    res.send(authUser)
})

server.post('/me/login', (req, res) => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    authUser.expired = date.toISOString()
    res.send(authUser)
})

server.get('/me/status', (req, res) => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    authUser.expired = date.toISOString()
    res.send(authUser)
})

server.post('/me/reset-notify', (req, res) => {
    res.send(require('./data/resetPassword.json'))
})

server.get('/me/profile', (req, res) => {
    res.send(require('./data/profile.json'))
})

server.get('/orders', (req, res) => {
    res.send(require('./data/orders.json'))
})

server.get('/visa-groups', (req, res) => {
    res.json(require('./data/visa-groups'))
})

server.get('/destinations', (req, res) => {
    res.json(require('./data/destinations'))
})

server.get('/citizenships', (req, res) => {
    res.send(require('./data/citizenships'))
})


var orderFiles = require('./data/order-files');

server.get('/orders/:id/files', (req, res) => {
    res.send(orderFiles);
});

var orderItemFiles = require('./data/order-item-files');

server.get('/orders/:id/services/:serviceId/files', (req, res) => {
    res.send(orderItemFiles);
});

server.put('/orders/:id/files/:fileId', (req, res) => {
    let success = false;

    orderFiles
        .forEach((orderFile, index) => {
            if (orderFile.id === Number(req.params.fileId)) {
                orderFiles[index] = req.body;
                success = true;
            }
        });

    if (success) {
        res.send(req.body);
    }

    if (!success) {
        res.status(400);
        res.send('Bad request');
    }
});

server.put('/orders/:id/services/:orderItemId/files/:fileId', (req, res) => {
    let success = false;

    orderItemFiles
        .forEach((orderFile, index) => {
            if (orderFile.id === Number(req.params.fileId)) {
                orderItemFiles[index] = req.body;
                success = true;
            }
        });

    if (success) {
        res.send(req.body);
    }

    if (!success) {
        res.status(400);
        res.send('Bad request');
    }
});

server.delete('/orders/:id/services/:orderItemId/files/:fileId', (req, res) => {
    let fileIndexes = orderItemFiles
        .forEach((document, index) => {
            if (document.id === Number(req.params.fileId)) {
                orderItemFiles.splice(index, 1);
                res.send('');
                res.end();
            }
        });

    res.status(404);
    res.send('Not found');
});

server.post('/orders/:id/services/:orderItemId/files', (req, res) => {
    let form = new formidable.IncomingForm();
    let resultFile = null;
    form.parse(req)
        .on('file', function(name, file) {
            resultFile = {
                id: Math.floor(Math.random() * (1000 - 1) + 1),
                author: 'Test author',
                date: new Date(),
                name: file.name,
                tags: [],
                url: 'http://localhost:3333' + file.path
            };
        })
        .on('field', function(name, field) {
            console.log('Got a field:', name);
        })
        .on('error', function(err) {
            next(err);
        })
        .on('end', function() {
            orderItemFiles.push(resultFile);
            res.send(resultFile);
        });
});

server.delete('/orders/:id/files/:fileId', (req, res) => {
    let fileIndexes = orderFiles
        .filter(document => document.id === Number(req.params.fileId))
        .map((document, index) => { return index });

    if (fileIndexes.length > 0) {
        let index = fileIndexes[0];
        orderFiles = orderFiles.splice(index, 1);
        res.send('');
    }

    if (fileIndexes.length === 0) {
        res.status(404);
        res.send('Not found');
    }
});
