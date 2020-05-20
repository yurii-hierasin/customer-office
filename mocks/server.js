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


server.get('/hello', (req, res) => {
    res.send({val: 'Hello, World!'});
})
