const Db = require('../db/db');
const fs = require('fs');
const uuidv1 = require('uuidv1');
const router = require('express').Router();

router.get("/notes", function (req, res) {
    Db.getNote()
        .then((note) => res.json(note))  
        .catch((err) => res.status(500).json(err));
});
router.post("/notes", (req, res) => {
    Db.addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;


