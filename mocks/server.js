const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3031


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

