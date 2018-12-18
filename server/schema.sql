CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS messages (
    ID int NOT NULL AUTO_INCREMENT,
    MessageText varchar(255),
    UserID int, 
    RoomID int, 
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES usernames(ID), 
    FOREIGN KEY (RoomID) REFERENCES roomnames(ID)
);



/* Create other tables and define schemas for them here! */

CREATE TABLE IF NOT EXISTS usernames (
    ID int NOT NULL AUTO_INCREMENT,
    UserNames varchar(255),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS roomnames (
    ID int NOT NULL AUTO_INCREMENT,
    RoomNames varchar(255),
    PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

