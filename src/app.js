const express = require('express')
const {Server} = require('socket.io')

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen( PORT, ()=> console.log("Escuchando"))
const io = new Server(server) // 2 esto conecta el server express con el socket(chat).
app.use(express.static(__dirname + "/public"))
app.use(express.json())

let log = [];

io.on('connection', (socket)=> { // 1 
    console.log("Socket escuchando")
    socket.broadcast.emit('newUser')

    socket.on("message", data => {
        log.push(data);
        io.emit('log', log);    
    } )
        
    socket.on("registered", data => {
        io.emit('log', log);    
    })
})

