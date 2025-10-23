﻿CREATE TABLE Users (
UserID varchar(36) NOT NULL PRIMARY KEY,
FirstName varchar(20),
LastName varchar(20)
);

CREATE TABLE Favourites (
FavouriteID varchar(36) NOT NULL PRIMARY KEY,
VideoID varchar(11),
UserID varchar(36) FOREIGN KEY REFERENCES Users(UserID)
);

CREATE TABLE Notes (
NoteID varchar(36) NOT NULL PRIMARY KEY,
VideoID varchar(11),
UserID varchar(36) FOREIGN KEY REFERENCES Users(UserID),
NoteText varchar(200)
);