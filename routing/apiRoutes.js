// dependincies
const Db = require('../db/db');
const fs = require('fs');
const uuidv1 = require('uuidv1');
const router = require('express').Router();

// get request that returns information in db.json
router.get("/notes", function (req, res) {
    Db.getNote()
        .then((note) => res.json(note))  
        .catch((err) => res.status(500).json(err));
});
// post request captures user input and puts it into db.json
router.post("/notes", (req, res) => {
    Db.addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

// deletes the object with the corresponding id
router.delete("/notes/:id", function (req, res) {
   console.log("delete route trigger")
    console.log(req.params.id)
    Db.removeNote(req.params.id) 
        .then(() => res.send(200))          
        .catch((err) => 
        console.log(err));
        
});

module.exports = router;


