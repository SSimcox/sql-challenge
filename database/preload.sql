DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog;

\c blog;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    author VARCHAR,
    content VARCHAR,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO posts(title,author,content) VALUES('Intro Post', 'Steven Simcox','This is an introductory post for this blog');