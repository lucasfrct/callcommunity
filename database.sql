DROP DATABASE IF EXISTS callcommunity;

CREATE DATABASE IF NOT EXISTS callcommunity;

DROP TABLE IF EXISTS callcommunity.tasks, callcommunity.contacts, callcommunity.multimedia, callcommunity.messages ;

CREATE TABLE IF NOT EXISTS callcommunity.tasks (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	enable BOOLEAN DEFAULT TRUE,
	title VARCHAR ( 255 ) NOT NULL,
	dated VARCHAR ( 255 ) NOT NULL,
	hour VARCHAR ( 255 ) NOT NULL,
	caller BOOLEAN DEFAULT FALSE NOT NULL,
	sms BOOLEAN DEFAULT FALSE NOT NULL,
	audio LONGTEXT NOT NULL,
	message LONGTEXT NOT NULL,
	contacts LONGTEXT NOT NULL,
	repeated LONGTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS callcommunity.contacts (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	enable BOOLEAN DEFAULT TRUE,
	name VARCHAR ( 255 ) NOT NULL,
	tel VARCHAR ( 255 ) NOT NULL,
	condominium LONGTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS callcommunity.multimedia (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	enable BOOLEAN DEFAULT TRUE,
	title VARCHAR ( 255 ) NOT NULL,
	description LONGTEXT NOT NULL,
	uri VARCHAR ( 255 ) NOT NULL,
	source MEDIUMBLOB NOT NULL 
);

CREATE TABLE IF NOT EXISTS callcommunity.messages (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT,
	enable BOOLEAN DEFAULT TRUE,
	title VARCHAR ( 255 ) NOT NULL,
	text LONGTEXT NOT NULL
);

INSERT INTO callcommunity.tasks ( title, dated, hour, caller, sms, message, contacts, repeated )
VALUES ( "Titulo 1 teste", "2018-1-1", "8:00", true, true, "Mensagem de teste", "[ name: 'nome de teste']", "[ dom: true, ter: true]" );