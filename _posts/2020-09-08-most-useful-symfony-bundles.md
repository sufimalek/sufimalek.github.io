---
title:  "Most Useful Symfony Bundles"
date:   2019-09-08 13:09:01
categories: 
    - symfony
    - featured
tags: 
    - featured
    - symfony
    - php
excerpt: "List of the bundles that I always end up installing in the projects that I develop with Symfony. They are not all, but I think that because of the functionality they provide and the versatility they offer when configuring them, it was worth talking a little about them"
image: /assets/images/symfony-bundle.jpg
---

 > “Symfony is basically a collection of high-quality components and bundles”.

`Bundles which help you in starting your symfony application and will help you develop a project with Symfony`  

![Alt](/assets/images/symfony-bundle.jpg)  

This evening I made a list of the bundles that I always end up installing in the projects that I develop with Symfony. They are not all, but I think that because of the functionality they provide and the versatility they offer when configuring them, it was worth talking a little about them. 
So … here we go! we will take a brief look on those.

## 1. FOSUserBundle
The FOSUserBundle adds support for a database-backed user system in Symfony2+. It provides a flexible framework for user management that aims to handle common tasks such as user registration and password retrieval.

Features include:
- Users can be stored via Doctrine ORM or MongoDB/CouchDB ODM
- Registration support, with an optional confirmation per email
- Login
- Password reset support
- Unit tested

**Update:**

Thanks to the **[MakerBundle](https://github.com/symfony/maker-bundle)** it is also possible to create the repetitive code of our authentication system in a fairly simple way 
using the **make** commands `make:user` , `make:auth` and `make:registration-form`. 
So if you are already familiar with Symfony 4 and the management of users and authentication this is the best option, 
especially in the case that you are going to need to expand the system logic with yours.

 
## 2. [FOSRestBundle](https://symfony.com/doc/3.x/bundles/FOSRestBundle/index.html)

This bundle provides various tools to rapidly develop RESTful API's & applications with Symfony. 

Features include:
- A View layer to enable output and format agnostic Controllers
- Accept header format negotiation including handling for custom mime types
- RESTful decoding of HTTP request body and Accept headers
- Map exception codes to HTTP response status codes
- A serializer error renderer that returns exceptions and errors in a format compatible with RFC 7807 using the Symfony Serializer component or the JMS Serializer 


## 3. [Doctrine Behavioral Extensions](https://github.com/Atlantic18/DoctrineExtensions)

In case you need automatic actions on your entities such as generating the slug from other properties, 
setting the creation or modification date automatically or adding the possibility of translating them, 
Doctrine Behavioral Extensions are your best option.

After installing them, we will access all these functionalities by simply defining the relevant annotations in the properties 
of your entity (or through a yaml file if you are using this configuration method).

#### Extensions

`Blameable` - updates string or reference fields on create, update and even property change with a string or object (e.g. user).

`Loggable` - helps tracking changes and history of objects, also supports version management.

`Sluggable` - urlizes your specified fields into single unique slug

`Timestampable` - updates date fields on create, update and even property change.

`Translatable` - gives you a very handy solution for translating records into different languages. Easy to setup, easier to use.

`Tree` - automates the tree handling process and adds some tree-specific functions on repository. (closure, nested set or materialized path) (MongoDB ODM only supports materialized path)

`IpTraceable` - inherited from Timestampable, sets IP address instead of timestamp

`SoftDeleteable` - allows to implicitly remove records

`Sortable` - makes any document or entity sortable

`Uploadable` - provides file upload handling in entity fields


## 4. [VichUploaderBundle](https://github.com/dustin10/VichUploaderBundle)

The VichUploaderBundle is a Symfony bundle that attempts to ease file uploads that are attached to ORM entities, MongoDB ODM documents, or PHPCR ODM documents.

 - Automatically name and save a file to a configured directory
 - Inject the file back into the entity or document when it is loaded from the datastore as an instance of Symfony\Component\HttpFoundation\File\File
 - Delete the file from the file system upon removal of the entity or document from the datastore
 - Templating helpers to generate public URLs to the file
 - All of this functionality is fully configurable to allow for app-specific customization.

 
## 5.[JMSSerializerBundle](https://github.com/schmittjoh/JMSSerializerBundle)
 
 If we need to serialize our entities (for example, to send them to third-party services such as Algoria), 
 Symfony has a component called Serializer that allows you to carry out this task quite simply. 
 As soon as we install it, we will have a complete serializer that will also provide us with options such as 
 the possibility of specifying serialization groups (since we will not always want to serialize all the properties) 
 and the definition of callbacks to control the entire process.
 
 
## 6. [DoctrineFixturesBundle](https://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.htm)

Fixtures are used to load a “fake” set of data into a database that can then be used for testing or to 
help give you some interesting data while you’re developing your application. 
This bundle makes creating fixtures easy, and supports the ORM (MySQL, PostgreSQL, SQLite, etc.).


## 7. [SncRedisBundle](https://github.com/snc/SncRedisBundle) - Redis Cache Bundle 

This bundle integrates [Predis](https://github.com/nrk/predis) and [PhpRedis](https://github.com/nicolasff/phpredis) into your Symfony 
3.4+ application, providing a fast and convenient interface to [Redis](https://redis.io/).

Using the native PhpRedis extension is recommended as it is faster and our main development platform. If the extension is not available and cannot be installed in your environment Predis is considered a safe and portable alternative, and our integration should be functionally identical.


## 8. [KnpPaginatorBundle](https://github.com/KnpLabs/KnpPaginatorBundle)

Friendly Symfony paginator to paginate everything. 

KnpPagination Symfony bundle is used to sort and paginate your website content. It is based on Knp Pager — a component that introduced a different way for handling pagination.


![KNP Paginator](/img/1_wLEcrhb5shrScRk5nfvwIg.png)

Depending on the requests, it offers the possibility of adding sorting or filtering functionalities. 
Paginator Bundle does not require initialization of precise parameters and can be customized to suit projects needs.

#### Features:

- Does not require initializing specific adapters.
- Can be customized in any way needed, etc.: pagination view, event subscribers.
- Possibility to add custom filtering, sorting functionality depending on request parameters.
- Separation of concerns, paginator is responsible for generating the pagination view only, pagination view - for representation purposes.

**Note**: using multiple paginators requires setting the alias in order to keep non conflicting parameters.


## 9. [HWIOAuthBundle](https://github.com/hwi/HWIOAuthBundle)

If you need to add the possibility of logging in using Facebook or any other social network, HWIOAuthBundle is perfect, since by simply defining the right listeners the login through third parties will be perfectly integrated into your application.
It is also compatible, as it could not be otherwise, with FOSUserBundle, so both will solve the entire tedious process of adding a login to your application. And yes, it also contemplates and solves the problem of duplication of users when their email already exists and signs in through a social network, something that is not always well managed.