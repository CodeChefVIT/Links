const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./api/models/user');

dotenv.config();

const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connection estabislished with MongoDB');
    })
    .catch(error => console.error(error.message));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method :', req.method);
    next();
});

//Static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Frontend'));

const user = new User({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
});

app.use("/user", require("./api/routers/user"));
app.use("/admin", require("./api/routers/admin"));
  
app.listen(3000);
