---
layout: post
title:  "Symfony5 + EasyAdmin3 <br/>
        [No route found for &quot;GET /admin &quot;]"
date:   2019-09-14 23:30:00
categories: 
    - symfony
    - easyadmin
tags: 
    - symfony
    - php
    - easyadmin
    - errors
description: "symfony5 + EasyAdmin 3.0"
image: /img/admin_no_route_found.png
---

Many users finding an issue while using EasyAdmin3 or upgrading from EasyAdmin2 -> EasyAdmin3.

## No route found for &quot;GET /admin&quot; (404 Not Found)

![Router Matched]({{ '/img/admin_no_route_found.png' | absolute_url }}){: .align-center}

### Main issue is `"/admin"` route and that's missing.

So, whenever you find such issue for this bundle or for any other routes. Please run below command to check if that route exists or not in the system.

 > `php bin/console debug:router`

you can find below output when you have a fresh setup.

```
 -------------------------- -------- -------- ------ ----------------------------------- 
  Name                       Method   Scheme   Host   Path                               
 -------------------------- -------- -------- ------ ----------------------------------- 
  _preview_error             ANY      ANY      ANY    /_error/{code}.{_format}           
  _wdt                       ANY      ANY      ANY    /_wdt/{token}                      
  _profiler_home             ANY      ANY      ANY    /_profiler/                        
  _profiler_search           ANY      ANY      ANY    /_profiler/search                  
  _profiler_search_bar       ANY      ANY      ANY    /_profiler/search_bar              
  _profiler_phpinfo          ANY      ANY      ANY    /_profiler/phpinfo                 
  _profiler_search_results   ANY      ANY      ANY    /_profiler/{token}/search/results  
  _profiler_open_file        ANY      ANY      ANY    /_profiler/open                    
  _profiler                  ANY      ANY      ANY    /_profiler/{token}                 
  _profiler_router           ANY      ANY      ANY    /_profiler/{token}/router          
  _profiler_exception        ANY      ANY      ANY    /_profiler/{token}/exception       
  _profiler_exception_css    ANY      ANY      ANY    /_profiler/{token}/exception.css   
  homepage                   ANY      ANY      ANY    /                                  
 -------------------------- -------- -------- ------ ----------------------------------- 
```

and you can also use below command to match exact route and check:

 > `php bin/console router:match /admin`

If route exists then it will show below matched route detail with it's controller and options:

![Router Matched]({{ '/img/admin_router_matched.png' | absolute_url }}){: .align-center}

else it will show

``` 
 [ERROR] None of the routes match the path "/admin"
```

 Let's come to the main point: **how to setup `/admin` route in EasyAdmin3**
 
 So, for this you need to create a controller by running a below command:
 
```
php bin/console make:admin:dashboard
```
This will resolve your main issue of not founding route.

If you have an entity to create a crud controller then:

```
php bin/console make:admin:crud
```