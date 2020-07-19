const connection = require("./connection")

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
class ORM {
  constructor(connection) {
    this.connection = connection
  }

  allNotes() {
    const queryString = "SELECT note_title, note_body FROM notes";
    return this.connection.query(queryString);
  };

  deleteNote(id) {
    const queryString = "DELETE FROM notes WHERE id=?"
    return this.connection.query(queryString, [id]);
  };






  //=============================================================
  // pasted methods

  // helper method for variable number of values
  printQuestionMarks(numberOfValuesOrColumns, type) {
    const questionMarks = [];

    for (var i = 0; i < numberOfValuesOrColumns; i++) {
      if (type === 'cols') {
        questionMarks.push("??");
      } else {
        questionMarks.push("?")
      }
    }
    return questionMarks.join(', ');
  }

  // combining tables for reading
  innerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.??`;

    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol])
  }

  // combining tables for reading
  innerJoinOne(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol, bookId) {
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.?? WHERE books.id=?`;

    // ...  -> is the spread operator. it spreads the values of an array into another array.
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol, bookId])
  }

  innerJoin3(colsToSelect, tableOne, tableTwo, tableThree, tableOneCol, tableTwoCol, tableThreeCol) {
    const queryString = `SELECT ${this.printQuestionMarks(colsToSelect.length, 'cols')} FROM ?? INNER JOIN ?? ON ??.?? = ??.?? INNER JOIN ?? ON ??.?? = ??.??`;
    // e.g. SELECT books.id, firstName, lastName, title, coverPhoto FROM books INNER JOIN authors ON books.authorId = authors.id INNER JOIN notes ON books.id = notes.bookdId
    return this.connection.query(queryString, [...colsToSelect, tableOne, tableTwo, tableOne, tableOneCol, tableTwo, tableTwoCol, tableThree, tableOne, tableTwoCol, tableThree, tableThreeCol])
  }

  // for creating a new value in a column in a table
  create(table, columns, values) {
    const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length, 'vals')})`;

    return this.connection.query(queryString, [table, ...values])
  }

  // for deleting a value from a column which is in a table
  delete(table, cols, value) {
    const queryString = 'DELETE FROM ?? WHERE ??=?';

    return this.connection.query(queryString, [table, cols, value])
  }
};

// exporting our ORM
module.exports = new ORM(connection);

const test = new ORM(connection);

// test.allNotes()
// .then(res => console.log(res))
// .catch(err=> console.error(err))