// dependencies
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const dbPath = path.join(__dirname + "/db/db.json");
// const readDb = fs.readFileSync(path.join(__dirname + "/db/db.json"));
// const notes = JSON.parse(readDb);
// console.log(notes)
// const util = require("util");

// util.promisify(fs.readFile);

// server port
const PORT = 8080;


// express
app.use(express.static("public"));
app.use(express.static("db"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// root route
app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
});

// /notes route
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// display notes in db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(
        dbPath,
        "utf8", function (err, data) {
            if (err) throw err;
            // console.log(data)
            res.json(JSON.parse(data))
        });
});

// save notes to db.json
//TODO: fix this
app.post("/api/notes", function (req, res) {


    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) throw err;
        const dbData = JSON.parse(data)
        console.log("db data pre push: ", dbData);

        let newID = Math.floor(Math.random() * 1000)
        const newNote = {
            id: newID,
            title: req.body.title,
            text: req.body.text
        };

        dbData.push(newNote);
        res.json(newNote)
        // console.log("dbData: ", dbData);
        // console.log("new note: ", newNote)
        // console.log("req.body: ", req.body);


        fs.writeFile(dbPath, JSON.stringify(dbData, null, 2), "utf8", function (err, data) {
            if (err) throw err;
        });
    });
});

//TODO: fix this
app.delete("/api/notes/:id", function (req, res) {
    // const noteID = req.params.id
    // console.log("note id: ", noteID)
    // fs.readFile(
    //     dbPath,
    //     "utf8", function (err, data) {
    //         if (err) throw err;
    //         const notes = JSON.parse(data);
    //         for (let i = 0; i < notes.length; i++) {

    //             if (notes[i]["id"] === noteID) {
    //                 console.log("notes: ", notes[i]);
                    
    //                 res.json(notes.splice(notes[i]["id"],1));
    
    //                 fs.writeFile(dbPath, JSON.stringify(notes, null, 2), "utf8", function (err, data) {
    //                     if (err) throw err;
    //                 })
    //             };

    //         };

    //     });
});

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT, PORT);
});