const express = require('express')
const path = require('path')
const io = require('socket.io')(3000,{
  cors: {
    origin: "*"
  }
})
const port = 5050
const app = express()
var chat = []


app.use((express.json()))
app.use(express.static(path.join(__dirname,"public")))

app.listen(port,()=>{
    console.log(`Servier is listning on port: ${port}`)
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","html/index.html"))
})



io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    socket.on("ping", (data) => {
        console.log("Received ping:", data);
    });

    socket.on("send_msg", (data) => {
        chat.push(data)
        socket.broadcast.emit("send_chat", chat);
        socket.emit("send_chat", chat);
    });

    socket.on("request_msg", (data) => {
        socket.emit("send_chat", chat);
    });
});


