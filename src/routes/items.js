const express = require('express');
const route = express.Router();
const auth  = require('../config/auth');

let db = require('../config/db');

route.get('/', auth.authenticate(), (req, resp) => {
    let userItems = db.listItems(req.user);
    resp.send(userItems);
});

module.exports = route;