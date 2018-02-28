-- noinspection SqlDialectInspectionForFile

-- noinspection SqlNoDataSourceInspectionForFile
CREATE TABLE IF NOT EXISTS votes (
    id          integer     PRIMARY KEY,
    uid         integer     NOT NULL,
    timestamp   float       NOT NULL check(timestamp >= 0),
    score       integer     NOT NULL check(score between 0 and 5),
    latitude    real        check(latitude between -90 and 90),
    longitude   real        check(longitude between -180 and 180),
    logical_loc varchar,
    address     varchar
);

CREATE TABLE IF NOT EXISTS posts (
    id          integer     PRIMARY KEY,
    voteID      integer     NOT NULL,
    parentID    integer,
    uid         integer     NOT NULL,
    message     varchar     NOT NULL,
    score       integer     NOT NULL check(score between 0 and 5),
    timestamp   float       NOT NULL,
    latitude    real        check(latitude between -90 and 90),
    longitude   real        check(longitude between -180 and 180),
    logical_loc varchar
);

CREATE TABLE IF NOT EXISTS post_votes (
    postID      integer,
    uid         integer     NOT NULL,
    reaction    integer     NOT NULL check(reaction between 0 and 1),
    FOREIGN KEY(postID) REFERENCES posts(id)
);

CREATE TABLE IF NOT EXISTS variables (
    key          varchar    PRIMARY KEY,
    val          integer    DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admin_credentials (
    digest       blob       NOT NULL,
    salt         blob       NOT NULL
);