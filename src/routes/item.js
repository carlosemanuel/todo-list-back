const express = require('express');
const router = express.Router();
const auth  = require('../config/auth')

let db = require('../config/db');

router.delete('/:id', auth.authenticate(), (req,resp) => {
    let item = db.findItem(req.params.id, req.user);
    if (item) {
        let items = db.deleteItem(req.params.id, req.user);
        resp.status(202).send(items);
    } else {
        resp.status(400).send({'message':'Item de id:' + req.params.id+' não existe'})
    }
});

router.put('/', auth.authenticate(), (req,resp) => {
    let item = req.body.item;
    let newItem = db.addItem(item, req.user)
    resp.status(201).send(newItem);
});

router.post('/:id', auth.authenticate(), (req, resp) => {
    resp.send(db.toogleCheckItem(req.params.id, req.user));
});

module.exports = router;