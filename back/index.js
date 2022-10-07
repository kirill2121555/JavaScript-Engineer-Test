const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
const routers = require('./routers/router')
const PORT = 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use('/images',express.static('images'))
app.use('/', routers)
app.set('views', path.join(__dirname, 'views'));


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://javaScriptengineertest:4tryr6dt4y6rt4y6rt4yb68rt4y@cluster0.mji1ow9.mongodb.net/?retryWrites=true&w=majority')
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT,() => console.log('server started on '+PORT+" port"))
        }
    } catch (e) {
        console.log(e)
    }
}

start()
module.exports = app;

