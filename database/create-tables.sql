CREATE USER 'tendai_tasker'@'localhost' IDENTIFIED BY '%A9]+pL7hf4^%#@%*(923)53';
\! echo "*** created database user tendai_tasker ***"

CREATE DATABASE IF NOT EXISTS tendai_task_book;
\! echo "*** created database tendai_task_book ***"
use tendai_task_book;

CREATE TABLE IF NOT EXISTS users (
	userid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128), password VARCHAR(256), hash VARCHAR(256), unique(username)
    )ENGINE InnoDB;

\! echo "*** created table users ***"
DESCRIBE users;

\! echo
CREATE TABLE IF NOT EXISTS tasks (
	taskid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(256), details VARCHAR(5000), email VARCHAR(256), finished INT(1) DEFAULT 0,  hashcode VARCHAR(128), UNIQUE(hashcode)
)ENGINE InnoDB;

\! echo "*** created table tasks ***"
DESCRIBE tasks;

GRANT INSERT,SELECT,UPDATE ON tendai_task_book.* TO `tendai_tasker`@`localhost`;