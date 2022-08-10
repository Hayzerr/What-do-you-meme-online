const process = require('node:process')
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const { addUser, removeUser, getUser, getUsersInRoom, ReadyAll } = require('./users')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())


io.on('connection', socket => {
    socket.on('join', (payload, callback) => {
        let numberOfUsersInRoom = getUsersInRoom(payload.room)
        console.log(socket.id)
        const { error, newUser} = addUser({
            id: socket.id,
            name: 1,
            room: payload.room,
            points: 0,
            ready: false
        })
        // console.log(newUser.name.charAt(7))

        if(error){
            return callback(error)

        }
        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
        socket.emit('currentUserData', {name: newUser.name})
        callback()
    })

    socket.on('initGameState', gameState => {
        const user = getUser(socket.id)
        if(user)
        io.to(user.room).emit('initGameState', gameState)
    })
    
    socket.on('updateGameState', gameState => {
        isstarted = gameState.gamestarted;
        console.log(gameState)
        const user = getUser(socket.id)
        if(user)
            io.to(user.room).emit('updateGameState', gameState)
    })

    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: payload.message})
        callback()
    })

    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
      });
      setTimeout(function () {
        console.log('This will still run.');
      }, 500);
    socket.on('disconnect', () => {
          
          
          // Intentionally cause an exception, but don't catch it.
        //   nonexistentFunc();
        const user = getUser(socket.id)
        removeUser({id: socket.id, room: user.room});

        if(getUsersInRoom(user.room).length > 0){
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        
        }
        
    })

    console.log('This will not run.');
    socket.on('setUsername', (username1) => {
        const user = getUser(socket.id)
        user.username = username1
        user.points = user.points
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        
    })
    socket.on('setPoints', (id) => {
        const user = getUser(id)
        user.points = user.points + 1 
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        
    })
    socket.on('Ready', () => {
        const user = getUser(socket.id)
        if(user.ready === false) user.ready = true
        else user.ready = false
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })
    socket.on('AllReady', gameState => {
        const user = getUser(socket.id)
        user.ready = false
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })
})

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})