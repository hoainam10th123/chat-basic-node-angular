const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const authJwt = require('./helpers/jwt')


app.use(cors())
app.options('*', cors())

const api = process.env.API_URL

const usersRouter = require('./router/user')

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use((err, req, res, next) => {
  console.log(err)

  if (err.name === 'ValidationError') {
    //  validation error
    return res.status(400).json({ message: err })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: "The user is not authorized" })
  }

  // default to 500 server error
  return res.status(500).json(err);
});

// Routes
app.use(`${api}/users`, usersRouter)

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
  console.log('Database is ready')
}).catch((err) => {
  console.log(err)
})


const usersOnline = new Map()
const socketToRoom = {}// lu tru connectionid va username tuong ung

// socketIO
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = process.env.PORT || 7000;

io.on('connection', (socket) => {
  socket.on("OnConnected", async (username) => {
    // moi user co the truy cap nhieu trinh duyet
    let obTemp = usersOnline.get(username)
    if (obTemp) {
      obTemp.push(socket.id)
    } else {
      usersOnline.set(username, [socket.id]);
    }
    socketToRoom[socket.id] = username;

    const keys = Array.from(usersOnline.keys());
    let onlineUserTemp = keys.filter(x=> x !== username)
    //basic emit back to sender
    socket.emit("GetOnlineUsers", onlineUserTemp);
    //to all clients in the current namespace except the sender
    socket.broadcast.emit("UserIsOnline", username)
  })

  socket.on('OnConnectedRoom', ({username, groupName}) =>{
    socket.join(groupName)
    // nen luu socket.id vao 1 Map rieng, do demo chạy nên làm như thế  này
    let obTemp = usersOnline.get(username)
    if (obTemp) {
      obTemp.push(socket.id)
    } else {
      usersOnline.set(username, [socket.id]);
    }
    socketToRoom[socket.id] = username;
  })

  socket.on('OnDisConnectedRoom', (room) =>{
    socket.leave(room);
  })

  socket.on('SendMessage', ({recipientUsername, content, groupName}) =>{
    const username = socketToRoom[socket.id]

    const message = {
      senderUsername: username,
      recipientUsername: recipientUsername,
      content: content
    }

    console.log(message)

    io.to(groupName).emit("NewMessage", message)
  })  

  socket.on('disconnect', () => {
    const username = socketToRoom[socket.id];    
    let connectionIds = usersOnline.get(username)

    if (connectionIds && connectionIds.length > 1) {
      connectionIds = connectionIds.filter(id => id !== socket.id)
      usersOnline.set(username, connectionIds)      
    }else{
      usersOnline.delete(username)
    }  
    delete socketToRoom[socket.id]
    //to all clients in the current namespace except the sender
    socket.broadcast.emit("UserIsOffline", username)
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));