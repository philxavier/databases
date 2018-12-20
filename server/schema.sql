CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE IF NOT EXISTS usernames (
    ID int NOT NULL AUTO_INCREMENT,
    UserNames varchar(255) DEFAULT 'guest',
    PRIMARY KEY (ID),
    UNIQUE (UserNames)
);

CREATE TABLE IF NOT EXISTS roomnames (
    ID int NOT NULL AUTO_INCREMENT,
    RoomNames varchar(255) DEFAULT 'main',
    PRIMARY KEY (ID),
    UNIQUE (RoomNames)
);

CREATE TABLE IF NOT EXISTS messages (
    ID int NOT NULL AUTO_INCREMENT,
    MessageText varchar(255),
    UserName varchar(255), 
    RoomName varchar(255), 
    PRIMARY KEY (ID),
    FOREIGN KEY (UserName) REFERENCES usernames(UserNames), 
    FOREIGN KEY (RoomName) REFERENCES roomnames(RoomNames)
);



/* Create other tables and define schemas for them here! */





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

