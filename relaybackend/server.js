const express = require('express')
const cors = require('cors')
const WebSocket = require('ws');
const app = express()

app.use(
  cors({origin: true}),
  express.json()
)

const socket = new WebSocket.Server({port: 8080})
socket.on('connection', (ws)=>{
  console.log('Websocket Connected')
  ws.send('asdasd')

  ws.on('close', ()=>{
    console.log('Websocket Closed')
  })
  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
  ws.on('message', (message) => {
    let pMessage = JSON.parse(message)
    console.log('received message ', pMessage);
    // Echo the message back to the client
    socket.clients.forEach(client => {
      ws.send(JSON.stringify({
        type: 'message',
        user: pMessage.user,
        time: pMessage.time,
        message: pMessage.message,
      }));
    })
  });

})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
