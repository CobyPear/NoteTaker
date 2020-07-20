DROP DATABASE IF EXISTS note_taker_db;
CREATE DATABASE note_taker_db;

USE note_taker_db;

CREATE TABLE note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(55) NOT NULL,
    text VARCHAR(5000) NOT NULL
);