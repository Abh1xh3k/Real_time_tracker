const express = require('express');
const app=express();
const path=require('path');
const socketio=require('socket.io');
const http =require('http');



const server=http.createServer(app);
const io=socketio(server);
app.use(express.static(path.join(__dirname,'public'))); // Serve static files from the 'public' directory (matlab jitni bhi static files hae wo iss path me milegi and .join ka matlab hae ki __dirname ke sath public ko join kar dega)
const port=3000;

io.on('connection',(socket)=>{
    socket.on('sendLocation',(cords)=>{
        io.emit('recieveLocation',{id:socket.id, ...cords});//...cords ka matlab hae ki latitude and longitude dono ko alag alag bhej dega backend pe  aur iss poore function ka kaam hae ki jab bhi koi user apni location bheje to sabko wo location mil jaye
    })
    // console.log("connected");
    socket.on('disconnect',()=>{
        io.emit('user Disconnected ',socket.id);
    });
});

app.get('/',(req,res)=>{
   res.render( "index" );
});
app.set('view engine','ejs');

server.listen((port),()=>{
    console.log(`Server is running on port ${port}`);
});