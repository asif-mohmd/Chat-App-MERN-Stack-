const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/data.js');
const connectDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const {notFound, errorHandler} = require('./middleware/errorMiddleware.js');

dotenv.config();
connectDB()
const app = express();

app.use(express.json() ) // to accept JSON Data

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user',userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT} `.yellow.bold))