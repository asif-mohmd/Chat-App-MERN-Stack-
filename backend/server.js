const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/data.js');
const connectDB = require('./config/db.js');
const colors = require('colors');

dotenv.config();
connectDB()
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});



app.get('/api/chat/:id', (req, res) => {
    console.log(req.params.id);
    const singleChat = chats.find((chat) => chat._id === req.params.id);
    res.send(singleChat);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT} `.yellow.bold))