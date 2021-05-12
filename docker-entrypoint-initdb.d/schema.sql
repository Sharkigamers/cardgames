CREATE TABLE IF NOT EXISTS widgets
(
    id int PRIMARY KEY,
    title text NOT NULL,
    description text NUL,
);

CREATE TABLE IF NOT EXISTS users
(
  id int PRIMARY KEY,
  username text NULL,
  password text NULL,
  client_id text NULL
);
