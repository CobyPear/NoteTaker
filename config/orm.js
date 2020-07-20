const connection = require("./connection")

// Object Relational Mapper (ORM)
class ORM {
  constructor(connection) {
    this.connection = connection
  }

  allNotes() {
    const queryString = "SELECT * FROM note;";
    return this.connection.query(queryString);
  };


  createNote(title, body) {
    const queryString = "INSERT INTO note (title, text) VALUE (?, ?);"
    return this.connection.query(queryString, [title, body]);

  };

  deleteNote(id) {
    const queryString = "DELETE FROM note WHERE id=?;"
    return this.connection.query(queryString, [id]);
  };

};

// exporting our ORM
module.exports = new ORM(connection);