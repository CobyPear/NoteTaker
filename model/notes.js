const orm = require("../config/orm");

class Note {

    getNotes() {
        return orm.allNotes();
    };

    createNote(title, body) {
        return orm.createNote(title, body);
    };

    deleteNote(id) {
        return orm.deleteNote(id);
    };

};

module.exports = new Note()