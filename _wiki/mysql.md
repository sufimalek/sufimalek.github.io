---
layout: wiki
title: MySQL
cate1: Basis
cate2: Database
description: MySQL Wiki
keywords: MySQL
---

## Use

### start and stop

```
```

### connect

```
mysql -u username -p password -h server IP address -P server MySQL port number -D database name
```

### authorized

Authorize remote login

```
grant permission 1, permission 2,... permission n on database name. table name to user name@user address identified by 'connection password';

```
### change Password

**Method 1**: Use the SET PASSWORD command

```
mysql -u root
mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');
```

**Method 2**: Use mysqladmin

```
mysqladmin -u root password "newpass"
```

If root has already set a password, use the following method

```
mysqladmin -u root password oldpass "newpass"
```

**Method 3**: Edit the user table directly with UPDATE

```
mysql -u root
mysql> use mysql;
mysql> UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';
mysql> FLUSH PRIVILEGES;
```

When you lose the root password, you can do this

```
mysqld_safe --skip-grant-tables&
mysql -u root mysql
mysql> UPDATE user SET password=PASSWORD("new password") WHERE user='root';
mysql> FLUSH PRIVILEGES;
```

### Execute the script from the command line

```
mysql -u root -p111111 -Dtest < test.sql
```

### other questions
MySQL 5.7 cannot be run directly after installation under Windows, steps are required:

1. mysqld install
2. mysqld --initialize-insecure automatically generates root user without password or mysqld --initialize automatically generates root user with random password
3. net start mysql
4. Mysql -u root

## Common SQL

### Check

```sql
-- View table creation statement
desc tb_name;
show create table tb_name;
-- Look at the index of the table
show index from table_name;
```

### Revise

```sql
-- Modify column properties
alter table tb_name modify column_name int auto_increment;
```

(If you are modifying the primary key, you cannot bring the primary key, otherwise it will report ERROR 1068 (42000): Multiple primary key defined)

### dump

```sql
-- dump library
mysqldump -u root -p db_name > 1.txt
-- dump table
mysqldump -u root -p db_name tb_name > 1.txt
-- dump table without data
mysqldump -u root -p --no-date db_name tb_name > 1.txt
```

### Database Status

```sql
show engine INNODB status;
```

Dirty page related

```sql
-- Whether to flush neighbors when flushing dirty pages
show VARIABLES like 'innodb_flush_neighbors';
-- set the value
set global innodb_flush_neighbors = 0;

-- Check the proportion of dirty pages
select VARIABLE_VALUE into @a from PERFORMANCE_SCHEMA.global_status where VARIABLE_NAME = 'Innodb_buffer_pool_pages_dirty';
select VARIABLE_VALUE into @b from PERFORMANCE_SCHEMA.global_status where VARIABLE_NAME = 'Innodb_buffer_pool_pages_total';
select @a/@b;
```

### disk space related

View the disk space occupied by the database:

```sql
SELECT
table_name,
    TABLE_SCHEMA,
    ( DATA_LENGTH + INDEX_LENGTH + DATA_FREE ) / 1024 / 1024 MB,
    TABLE_ROWS
    FROM
    information_schema. TABLES
    WHERE
    TABLE_SCHEMA NOT IN ('information_schema','mysql')
    ORDER BY
    MB DESC
    LIMIT 0,
    50
```

View the data, indexes, and space allocated to the table but not used in the table:

```sql
SELECT
table_name,
    TABLE_SCHEMA,
    DATA_LENGTH/ 1024 / 1024 _DATA, INDEX_LENGTH/ 1024 / 1024 _INDEX, DATA_FREE/ 1024 / 1024 _DATA_FREE,
    TABLE_ROWS
    FROM
    information_schema. TABLES
    WHERE
    TABLE_SCHEMA NOT IN ('information_schema','mysql')
    ORDER BY
    _DATA DESC
    LIMIT 0,
    50
```

View the file size of the database:

### Troubleshoot/solve blocking problems

```sql
-- Check which tables are open
show open tables -- where in_use > 0;
-- View process
show [full] processlist;
-- View the process of Sending data status
select * from information_schema.`PROCESSLIST` where db = 'db_name' and state = 'Sending data' order by time desc;
-- Generate kill <pid>; statements in batches
select concat("kill ", id, ";") from information_schema.`PROCESSLIST` where db = 'db_name' and state = 'Sending data' order by time desc;
-- Generate kill <pid>; statements in batches and write the result set to a file
select concat("kill ", id, ";") from information_schema.`PROCESSLIST` where db = 'db_name' and state = 'Sending data' order by time desc into outfile '/tmp/a.txt';
-- executable file
source /tmp/a.txt

-- kill the specified process
kill <pid>;
-- View locked transactions
select * from information_schema.INNODB_LOCKS;
-- View pending transactions
select * from information_schema.INNODB_LOCK_WAITS;
-- View the number of threads related
show global status like 'Thread%'
-- View the configuration of the number of cache threads
show VARIABLES like 'thread_cache_size'
```

### SQL tricks

```sql
-- Append content after the original value, conditional on the rightmost digits of the value
update table_name set col1 = concat(col1, 'xxx') where right(col1, 1) = '?';
-- limit example
SELECT * FROM Orders LIMIT 30;
SELECT * FROM Orders LIMIT 10 OFFSET 15; -- 16th to 25th results
SELECT * FROM Orders LIMIT 15, 10; -- equivalent to above
```
