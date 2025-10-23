INSERT INTO Users (UserID, FirstName, LastName)
VALUES ('c7a3325b-8c36-448d-819f-8924d154aee0', 'Rob', 'Bentley')

INSERT INTO Favourites (FavouriteID, UserID, VideoID)
VALUES ('d02a4074-5956-4476-b7b5-9c6d06f76c70', 'c7a3325b-8c36-448d-819f-8924d154aee0', 'JTkSQxWk_u8'),
('5451ffb7-6972-40ad-8b54-78bd2bbb148f', 'c7a3325b-8c36-448d-819f-8924d154aee0', 'eg0Yx8VI-ek'),
('c320746e-f344-45b9-9edb-78f47801b109', 'c7a3325b-8c36-448d-819f-8924d154aee0', 'G4jS2FDcqww')

INSERT INTO Notes (NoteID, FavouriteID, NoteText)
VALUES ('384c361f-4e25-4938-beb6-4b6a88d83085','d02a4074-5956-4476-b7b5-9c6d06f76c70','Found this one very helpful for improving 3BLD times.'),
('8aa6b2e9-87bb-4e40-9e5e-a3f1196f8127','d02a4074-5956-4476-b7b5-9c6d06f76c70','Example Scramble 1: L'' D2 B2 D2 B D F D R'' F'' U D L2 B2 D B2 L2 B2 U'' B2 R2. Example Scramble 2: D'' F2 L2 U'' R2 U B2 D U F'' R F2 L B F U2 L U2 F R'''),
('b78267f5-7ca0-4c3c-a0c6-aebf34fa2405','5451ffb7-6972-40ad-8b54-78bd2bbb148f','His jump technique is great; I need to study this.')

