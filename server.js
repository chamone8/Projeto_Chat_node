const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);//obrigatorio adionar o server


//definir o  html no node
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/',(req,res)=>{
    res.render('index.html');
});



var messages = [];
//conexão com o front via socket io
io.on('connection', socket =>{
    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receiveMessage', data)
    });
});

server.listen(3000,(err)=>{
    console.log("conectado")
})