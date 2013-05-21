
DROP TABLE if exists nodeusers;
CREATE TABLE nodeusers(
uid bigserial NOT NULL,
create_stamp TIMESTAMP,
update_stamp TIMESTAMP,
publish_stamp TIMESTAMP,
user_full VARCHAR(50) NOT NULL,
user_pass VARCHAR(50) NOT NULL,
user_login VARCHAR(50) NOT NULL,
user_email VARCHAR(50),
user_url VARCHAR(50),
CONSTRAINT "PK_users" PRIMARY KEY (uid ));

DROP TABLE if exists nodeposts;
CREATE TABLE nodeposts(
nid bigserial NOT NULL,
create_stamp TIMESTAMP,
update_stamp TIMESTAMP,
publish_stamp TIMESTAMP,
post_content TEXT,
post_name VARCHAR(255) NOT NULL,
post_desc VARCHAR(255) NOT NULL,
author bigserial NOT NULL,
host_name VARCHAR(255) NOT NULL,
CONSTRAINT "PK_host" PRIMARY KEY (nid ));
