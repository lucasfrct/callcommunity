DROP DATABASE IF EXISTS test;

CREATE DATABASE IF NOT EXISTS test;

DROP TABLE IF EXISTS test;

CREATE TABLE IF NOT EXISTS test (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	user VARCHAR ( 255 ) NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	parent LONGTEXT
);

INSERT INTO test ( user, password, parent ) 
VALUES ( "user", "password", "parent" );