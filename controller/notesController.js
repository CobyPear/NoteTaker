const express = require('express');
const router = express.Router();
const Note = require('../model/notes');

// display notes in db
router.get("/api/notes", function (req, res) {

    Note.getNotes()
        .then(results => res.json(results))
        .catch(console.error);
});

// save notes to db
router.post("/api/notes", function (req, res) {

    Note.createNote(req.body.title, req.body.text)
        .then(results => res.json(results))
        .catch(console.error);
});

// delete note from db
router.delete("/api/notes/:id", function (req, res) {

    const id = req.params.id
    Note.deleteNote(id)
        .then(results => res.json(results))
        .catch(console.error);
});

module.exports = router;