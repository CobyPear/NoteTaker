DROP DATABASE IF EXISTS note_taker_db;
CREATE DATABASE note_taker_db;

USE note_taker_db;

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_title VARCHAR(55) NOT NULL,
    note_body VARCHAR(5000)
);