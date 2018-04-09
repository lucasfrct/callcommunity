DROP DATABASE IF EXISTS crud;

CREATE DATABASE IF NOT EXISTS crud;

DROP TABLE IF EXISTS crud.users, crud.log, crud.address;

CREATE TABLE IF NOT EXISTS crud.users (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	enable BOOLEAN DEFAULT TRUE,
	name VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) NOT NULL,
	emailSecurity VARCHAR ( 255 ) NOT NULL,
	password VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS crud.log (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	idUser INT ( 11 ) NOT NULL,
	message VARCHAR ( 255 ) NOT NULL,
	FOREIGN KEY ( idUser ) REFERENCES crud.users ( id ) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS crud.address (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	idUser INT ( 11 ) NOT NULL,
	enable BOOLEAN DEFAULT TRUE,
	street VARCHAR ( 255 ),
	number VARCHAR ( 255 ),
	district VARCHAR ( 255 ),
	city VARCHAR ( 255 ),
	country VARCHAR ( 255 ),
	latitude VARCHAR ( 255 ),
	longitude VARCHAR ( 255 ),
	FOREIGN KEY ( idUser ) REFERENCES crud.users ( id ) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO crud.users ( name, email, emailSecurity, password ) 
VALUES ( "Name", "E-mail", "E-mail Security", "Password" );