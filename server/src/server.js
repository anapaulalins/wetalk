
const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const firebase = require('firebase')
const cors = require('cors')


const app = express();
app.use(cors())
const server = http.createServer(app);


const firebaseConfig = {
  apiKey: "AIzaSyCi5hkCDzKbscq3ZunRUmLhvrDH4-vNyk8",
  authDomain: "wetalk-464ff.firebaseapp.com",
  projectId: "wetalk-464ff",
  storageBucket: "wetalk-464ff.appspot.com",
  messagingSenderId: "128970528113",
  appId: "1:128970528113:web:04a3e3bb9deb5386c852d0",
  databaseURL: "",
};

if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(firebaseConfig);
}

  
const db = firebase.default.firestore()
  

const io = socketIO(server);

const SERVER_PORT = 3333

server.listen(SERVER_PORT, () => console.log(`Example app listening on port ${SERVER_PORT}!`))

const rooms = {}

io.on('connection', socket => {
  console.log('connected')

  console.log(socket.id)

  socket.on('join', (room) => {

    console.log(room)
    
    socket.join(room)

   if(room){
      db.collection('chats').doc(room).onSnapshot(doc => {
        const data = doc.data()

        if(data){
          io.to(room).emit('prevMessage', data.messages)
        }
      })
    }
    
  })

  socket.on('sendMessage', ({room, messageSend}) => {
    console.log(room)
    console.log(messageSend)

    db.collection('chats')
      .doc(room)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageSend),
      });
      
  })

  socket.on('disconnect', () => {console.log('Disconnected')})

  socket.on('joinVideo', room => {

   
    rooms[room] = rooms[room] && rooms[room].set(socket.id, socket) || (new Map()).set(socket.id, socket)

    socket.emit('connection-success', {
      success: socket.id,
      peerCount:rooms[room].size,
      room: room
    })

    socket.on('disconnect', () => {
      rooms[room].delete(socket.id)
      
      console.log(rooms[room].size)

      if(rooms[room].size === 0){
        db.collection('chats').doc(room).update({
          inCall: false
        })
      }
    })


  })


  socket.on('onlinePeers', (data) => {
    const connectedPeers = rooms[data.room]
    for (const [socketID, _socket] of connectedPeers.entries()) {
      
      if (socketID !== data.socketID.local) {
        console.log('online-peer', data.socketID, socketID)
        socket.emit('online-peer', socketID)
      }
    }
  })

  socket.on('offer', data => {
    const connectedPeers = rooms[data.room]
    for (const [socketID, socket] of connectedPeers.entries()) {
      // don't send to self
      if (socketID === data.socketID.remote) {
        // console.log('Offer', socketID, data.socketID, data.payload.type)
        socket.emit('offer', {
            sdp: data.payload,
            socketID: data.socketID.local
          }
        )
      }
    }
  })

  socket.on('answer', (data) => {
    const connectedPeers = rooms[data.room]
    for (const [socketID, socket] of connectedPeers.entries()) {
      if (socketID === data.socketID.remote) {
        console.log('Answer', socketID, data.socketID, data.payload.type)
        socket.emit('answer', {
            sdp: data.payload,
            socketID: data.socketID.local
          }
        )
      }
    }
  })

  socket.on('candidate', (data) => {
    const connectedPeers = rooms[data.room]
    for (const [socketID, socket] of connectedPeers.entries()) {
      if (socketID === data.socketID.remote) {
        socket.emit('candidate', {
          candidate: data.payload,
          socketID: data.socketID.local
        })
      }
    }
  })
})



