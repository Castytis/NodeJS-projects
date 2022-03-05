const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.emit('welcomeMessage', 'Welcome')

    socket.on('sendMessage', (message) => {
       io.emit('message', message)
        
    })
})

server.listen(port, () => {
    console.log('Server started on port ' + port)
})