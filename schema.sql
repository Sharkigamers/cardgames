CREATE TABLE IF NOT EXISTS widgets
(
    id int PRIMARY KEY,
    idUser text NOT NULL,
    type text NOT NULL,
    param_1 text NULL,
    param_2 text NULL,
    param_3 text NULL,
    param_4 text NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id int PRIMARY KEY,
    username text NULL,
    password text NULL,
    client_id text NULL,
    email text NULL
);

CREATE TABLE IF NOT EXISTS userData
(
    id_widget int NOT NULL,
    id_user int NOT NULL
);

INSERT INTO users VALUES(0, 'lo@lo', '123', 'pdpd', 'lo@lo');
INSERT INTO widgets VALUES(0, 'emmanuelblineau@gmail.com', 'weather', 'aya', '', '', '');
INSERT INTO widgets VALUES(2, 'emmanuelblineau@gmail.com', 'youtube', 'UCv8TJfDAkm0M0byPRNthX8w', '', '', '');
INSERT INTO widgets VALUES(1, 'sharkigamers@gmail.com', 'weather', 'aya', '', '', '');