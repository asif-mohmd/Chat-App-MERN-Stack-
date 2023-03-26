const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/data.js');
const connectDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const {notFound, errorHandler} = require('./middleware/errorMiddleware.js');

dotenv.config();
connectDB()
const app = express();

app.use(express.json() ) // to accept JSON Data

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT} `.yellow.bold))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        },
        });

        io.on('connection', (socket) => {
            console.log('connected to socket.io'); 
           
            socket.on("setup" , (userData)=>{
                socket.join(userData._id);
                console.log(userData._id);
                socket.emit("connected");

            })

            socket.on("join chat", (room) => {
                socket.join(room);
                console.log("User Joined room" + room);
            });

            socket.on("typing", (room) => {
                socket.in(room).emit("typing");
            });
            
            socket.on("stop typing", (room) => {
                socket.in(room).emit("stop typing");
            });

            socket.on("new message", (newMessageRecieved) => {
                var chat = newMessageRecieved.chat;
                if(!chat.users)
                return console.log('Chat.users not defined');

                chat.users.forEach((user) => {
                    if(user._id == newMessageRecieved.sender._id)
                    return;
                    socket.in(user._id).emit("message recieved", newMessageRecieved);
                });
                
            });
        });