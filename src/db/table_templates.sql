-- noinspection SqlDialectInspectionForFile

-- noinspection SqlNoDataSourceInspectionForFile

CREATE TABLE IF NOT EXISTS votes (
    id          integer     PRIMARY KEY,
    uid         integer     NOT NULL,
    timestamp   float     NOT NULL,
    score       integer     NOT NULL check(score between 0 and 5),
    latitude    real        check(latitude between -90 and 90),
    longitude   real        check(longitude between -180 and 180),
    logical_loc varchar,    --TODO: restrict this to simple formats?
    address     varchar     --TODO: ban dangerous characters
);

CREATE TABLE IF NOT EXISTS posts (
    id          integer     PRIMARY KEY,
    voteID      integer     NOT NULL,
    parentID    integer,
    uid         integer     NOT NULL,
    message     varchar     NOT NULL,
    upvotes     integer     NOT NULL check(upvotes >= 0),
    downvotes   integer     NOT NULL check(downvotes >= 0),
    timestamp   float     NOT NULL,
    latitude    real        check(latitude between -90 and 90),
    longitude   real        check(longitude between -180 and 180),
    logical_loc varchar    --TODO: restrict this to simple formats?
);

CREATE TABLE IF NOT EXISTS post_votes (
    postID      integer,     --FOREIGN KEY REFERENCES posts, --TODO: figure out if primary key may be a problem
    uid         integer     NOT NULL,
    isUpvote    integer     NOT NULL check(isUpvote between 0 and 1),
    FOREIGN KEY(postID) REFERENCES posts(id)
);