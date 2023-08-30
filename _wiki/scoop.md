---
layout: wiki
title: Scoop
cate1: Tools
cate2: 
description: Windows Download an easy-to-use package management tool.
keywords: scoop, windows
---

## Specify the Scoop installation directory

Environment variables:

```
SCOOP='D:\Applications\Scoop'
```

## Specify the installer custom directory

After setting the `SCOOP` environment variable, the program will be installed in the `%SCOOP%\apps` directory by default.

You can also customize the global installation directory:

```
SCOOP_GLOBAL='D:\Applications\ScoopApps'
```

This requires `scoop install -g <appname>` to install globally, which needs to be executed with administrator privileges.

## Increase download speed

```
scoop install aria2
```

## software download

Install to default directory:

```
scoop install <appname>
```

Install to the global installation directory:

```
scoop install -g <appname>
```

Software Search:

```
scoop search <appname>
```

List known buckets:

```
scoop bucket known
```

Add buckets:

```
scoop bucket add <bucketname>
```

## View software information

List installed software:

```
scoop list
```

View a software information:

```
scoop info <appname>
```