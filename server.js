// dependencies
const express = require("express");
const app = express();
const path = require("path");
const Note = require("./model/notes");

// server port
const PORT = process.env.PORT || 8080;

// express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// /notes route
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// display notes in db
app.get("/api/notes", function (req, res) {
    Note.getNotes()
    .then(results => res.json(results))
    .catch(console.error);
});

// save notes to db
app.post("/api/notes", function (req, res) {

  Note.createNote(req.body.title, req.body.text)
    .then(results => res.json(results))
    .catch(console.error);
});

// delete note from db
app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id
    Note.deleteNote(id)
    .then(results => res.json(results))
    .catch(console.error);
});

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT);
});