const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 8080;

app.use(express.static("public"));
app.use(express.static("db"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
   fs.readFile(
        path.join(
            __dirname + "/db/db.json"),
            "utf8", function(err, data) {
                if (err) throw err;
                res.json(data)
            })

})

app.post("/api/notes", function(req, res){
    fs.writeFile(
         path.join(
             __dirname + "/db/db.json"),
             JSON.stringify(req.body), function(err, data) {
                 if (err) throw err;
                 console.log(data)
                 res.json(data)
             })
 
 })

app.listen(PORT, function(){
    console.log("Server is listening on PORT" , PORT);
});