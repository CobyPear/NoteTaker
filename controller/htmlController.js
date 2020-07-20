const express = require('express');
const router = express.Router();
const path = require("path");

// /notes route
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "../../public/notes.html"));
});

module.exports = router;