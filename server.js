// dependencies
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// server port
const PORT = process.env.PORT || 8080;

// express
app.use(express.static("public"));
app.use(express.static("db"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// /notes route
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// display notes in db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        // console.log(data)
        res.json(JSON.parse(data))
    });
});

// save notes to db.json
app.post("/api/notes", function (req, res) {

    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);

        if (data.length === 0){
            req.body.id = 0;
        } else {
            req.body.id = data[data.length -1].id +1;
        };

        data.push(req.body);

        fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(data, null, 2), "utf8", function (err) {
            if (err) throw err;
            res.sendStatus(200)
        });
    });
});

// delete note from db.json
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname + "/db/db.json"),"utf8", function (err, data) {
            if (err) throw err;
            data = JSON.parse(data);
            const filteredNotes = [];
            for (let i = 0; i < data.length; i++) {
                if (parseInt(req.params.id) !== data[i].id) {
                    filteredNotes.push(data[i])
                };
            };
            fs.writeFile(path.join(__dirname + "/db/db.json"), JSON.stringify(filteredNotes, null, 2), "utf8", function (err) {
                if (err) throw err;
                res.sendStatus(200)
            });
        });
});

app.listen(PORT, function () {
    console.log("Server is listening at http://localhost:" + PORT);
});