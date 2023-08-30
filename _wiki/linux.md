---
layout: wiki
title: Linux/Unix
cate1: Basis
cate2: OS
description: Some common commands and usage under Unix-like systems.
keywords: Linux
---

Some common commands and usage under Unix-like systems.

## utility command

### chown
Change file owner and group.

For example, the current owner of a folder is root and needs to be changed to admin:

```sh
chown -R admin:admin test
```

### chmod

Modify file permissions.

### fuser

See who owns the file.

```sh
fuser -u .linux.md.swp
```

### id

View current user, group id.

### lsof

View a list of open files.

> An open file may be a regular file, a directory, a block special file, a character special file, an executing text reference, a library, a stream or a network file (Internet socket, NFS file or UNIX domain socket.) A specific file or all the files in a file system may be selected by path.

#### View network-related file usage

```sh
lsof -i
```

#### View port usage

```sh
lsof -i tcp:5037
```

#### Check who owns a file

```sh
lsof.linux.md.swp
```

#### View the file information occupied by a user

```sh
lsof -u mazhuang
```

`-u` can be followed by uid or login name.

#### View the file information occupied by a program

```sh
lsof -c Vim
```

Note that program names are case sensitive.
