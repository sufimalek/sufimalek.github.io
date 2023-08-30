---
layout: wiki
title: Python
cate1: Programming Language
cate2: 
description: Python Common modules and resource records.
keywords: Python
---
## modules

### requests

Elegant and simple HTTP module.

### BeautifulSoup

Nice HTML/XML parser.

### json

JSON codec.

Application examples:

* format JSON file

   ```sh
   python -m json.tool src.json > dst.json
   ```

   Format JSON in Vim:

   ```sh
   :%!python -m json.tool
   ```

### CGIHTTPServer

Simple and useful HTTP server.

Application examples:

* Run a simple HTTP server

   ```sh
   python -m CGIHTTPServer 80
   ```

### base64

A module for convenient base64 encoding and decoding.

Application examples:

* decode base64

   ```sh
   echo aGVsbG93b3JsZA== | python -m base64 -d
   ```

   then you can see the output

   ```sh
   helloworld
   ```

## problem solved
