const express    = require('express');
const passport   = require('passport');
const db         = require('./config/db');
const jwt        = require('jwt-simple');
const cors       = require('cors')

const itemRoute  = require('./routes/item');
const itemsRoute = require('./routes/items');
const auth       = require('./config/auth')
const cfg        = require("./config/config.js");

const app = express();

app.use(cors())

app.use(express.json());

app.use('/item', itemRoute);
app.use('/items', itemsRoute);
app.use(auth.initialize())

app.post('/token',  (req, resp) => {
    if (req.body.email && req.body.password) {
      let email = req.body.email;
      let password = req.body.password;

      let user = db.findUserByEmail(email);
      if (user && user.password === password) {
          let payload = {
            name: user.name,
            email: user.email,
            id: user.id
          }
          let token = jwt.encode(payload, cfg.jwtSecret);
          resp.json({token: token});
      } else {
          resp.sendStatus(401);
        }
    } else {
        resp.sendStatus(401);
    }
  });

app.put('/user', (req, resp) => {
  if (req.body.email && req.body.password && req.body.name) {

    let oldUser =db.findUserByEmail(req.body.email)

    if (!oldUser) {
      let user = {}
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password
  
      user = db.addUser(user)
      resp.status(201).send(user)
    } else {
      resp.status(400).send({'message':'usuário já existe'})
    }
    
  } else {
    resp.sendStatus(400)
  }
});

app.listen(5000, () => { 
    console.log('running on 5000')
});
