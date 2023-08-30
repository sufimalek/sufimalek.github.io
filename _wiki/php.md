---
layout: wiki
title: PHP
cate1: Programming Language
cate2: 
description: A record of problems encountered in the process of learning php.
keywords: php
---

## Q & A

### How to check the php.ini file path?

Create a new test.php file with the following content:

```php
<?php
phpinfo();
?>
```

Then use the url to access test.php in the browser, and a large amount of relevant information such as php-related configurations and plug-ins will be displayed. Among them, the `Loaded Configuration File` item can find all effective php.ini file paths.

Or, more simply, you can directly run the command to output the above information (if you have installed multiple versions of php, be careful to use the correct php command):

```sh
php -r "phpinfo();"
```

### Run a php file locally

```sh
php [-f] test.php
```

### Several error messages and corresponding solutions

hint:

```sh
PHP Fatal error: Uncaught Error: Call to undefined function socket_create()
```

Solution:

Configure the enabled extension php_curl.dll in the php.ini file.

hint:

```sh
PHP Fatal error: Uncaught Error: Call to undefined function curl_init()
```

Solution:

Configure the enabled extension php_curl.dll in the php.ini file.

hint:

```sh
The openssl extension is required for SSL/TLS protection but is not available. If you can not enable the openssl extension, you can disable this error, at your own risk, by setting the 'disable-tls' option to true
```

Solution:

Configure the enabled extension php_openssl.dll in the php.ini file.

### Display error messages directly on the page in the development environment

Modify the php.ini file and configure `display_errors = On`.


### Make the configuration take effect after modifying php.ini

```sh
service php-fpm restart
```