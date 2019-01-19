DROP DATABASE IF EXISTS callcommunity;
CREATE DATABASE IF NOT EXISTS callcommunity;

/* TABLE REGISTERS ***********************************************************/
DROP TABLE IF EXISTS callcommunity.registers;
CREATE TABLE IF NOT EXISTS callcommunity.registers (
	`id` INT ( 11 ) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`user` VARCHAR ( 255 ) NOT NULL,
	`email` VARCHAR ( 255 ) NOT NULL,
	`country` VARCHAR ( 255 ),
	`ddd` INT ( 3 ),
	`telephone` INT ( 9 ),
	`password` VARCHAR ( 255 ) NOT NULL
) ENGINE = MyISAM;

CREATE INDEX email ON callcommunity.registers ( email ( 4 ), telephone ( 4 ) );
CREATE INDEX telephone ON callcommunity.registers ( telephone ( 4 ) );
CREATE INDEX password ON callcommunity.registers ( password ( 4 ) );
/* **************************************************************************** */

/* TABLE USERS **************************************************************** */
DROP TABLE IF EXISTS callcommunity.users;
CREATE TABLE IF NOT EXISTS callcommunity.users ( 
	`id` INT ( 11 ) NOT NULL,
	`user` VARCHAR ( 255 ) NOT NULL,
	`firstName` VARCHAR ( 255 ),
	`nickName` VARCHAR ( 255 ),
	`lastName` VARCHAR ( 255 )
) ENGINE = MyISAM;
/* *************************************************************************** */


/* TRIGGER INSERT REGISTERS ************************************************** */
DELIMITER //
CREATE TRIGGER tgrs_insert_registers AFTER INSERT 
ON callcommunity.registers 
FOR EACH ROW
BEGIN
	INSERT INTO callcommunity.users ( `id`, `user` ) 
	VALUES ( NEW.id, NEW.user );
END //
DELIMITER ;
/* **************************************************************************** */

/* INSERT TABLE REGISTERS ***************************************************** */
INSERT INTO callcommunity.registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password` ) 
VALUES ( 'root', 'root@domain.com', "+55", 12, 991285145, 'root1234' );

INSERT INTO callcommunity.registers ( `user`, `email`, `country`, `ddd`, `telephone`, `password` ) 
VALUES ( 'admin', 'admin@domain.com', "+55", 12, 991285145, 'admin1234' );
/* ***************************************************************************** */