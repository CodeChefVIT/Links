const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./Backend/models/user');
const Link = require('./Backend/models/link');
const jwt = require('jsonwebtoken')

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

// User Related
// For Updating No of Clicks
app.put('/updateCount/:id', (req, res) => {
    //const link = req.body.link;
    const id = req.params.id;

    Link.updateOne({ _id: id }, { $inc: { clicks: 1 } })
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

// All links
app.get('/allLinks', (req, res) => {
    Link.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});


app.post('/admin',authenticateToken , (req, res) => {

    const {name, redirectTo, clicks} = req.body;
    console.log(req.body);
    const link1 = new Link({name, redirectTo, clicks});

    link1.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });

})

app.put('/admin/:id', authenticateToken,(req, res) => {

    //const link = req.body.link;
    const id = req.params.id;

    const {name, redirectTo, clicks} = req.body;
    console.log(req.body);
    const link1 = new Link({name, redirectTo, clicks});

    Link.updateOne({ id: id }, link1)
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.delete('/admin/:id', authenticateToken ,(req, res) => {
    const id = req.params.id;

    Link.findByIdAndDelete(id)
        .then(result => {
            //console.log('yup');
            res.status(200).send(result);

        })
        .catch((err) => {
            console.log(err);
        });
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.name
  const user = {name: username}
  const password = req.body.password
  if(password != process.env.ADMIN_PASSWORD)
  {
    return res.status(402).json({
      message: "Incorrect Passowrd"
    })
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
}
  
app.listen(3000)
