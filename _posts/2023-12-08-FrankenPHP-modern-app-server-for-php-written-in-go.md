---
layout: post
title: "FrankenPHP: A modern app server for PHP, written in Go"
excerpt: "FrankenPHP is a modern application server for PHP apps, built on top of the Caddy web server. It has features such as worker mode, real-time capabilities, automatic HTTPS, HTTP/2, and HTTP/3 support."
author: 
date: 2023-12-08
categories: [php, FrankenPHP]
tags: [php, FrankenPHP]
pin: true
keywords: [php, server, FrankenPHP]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

<!-- ![Alt](/assets/images/posts/franken_php.png) -->

# FrankenPHP: A New Way to Run PHP Apps with Go

![image](/assets/images/posts/franken_php_small.png){: style="float: left"}

<span class="dropcap-element-slot">P</span>HP is one of the most popular and widely used programming languages for web development. However, it also has some drawbacks, such as performance issues, lack of concurrency support, and dependency on external services like PHP-FPM or Apache. 

What if there was a way to run PHP apps without these limitations, using the power and simplicity of Go? That's what FrankenPHP aims to do. FrankenPHP is a modern application server for PHP apps, built on top of the Caddy web server. It has features such as worker mode, real-time capabilities, automatic HTTPS, HTTP/2, and HTTP/3 support. It works with any PHP app and can also be used as a Go library to embed PHP in any app using net/http²³.

## How FrankenPHP Works

FrankenPHP is not a PHP compiler or transpiler. It uses the official PHP executor embedded in a state-of-the-art web server: Caddy. This means that you can use all the PHP features and extensions that you are familiar with, without sacrificing compatibility or security. You can also take advantage of Caddy's modules and plugins, such as authentication, caching, load balancing, and more.

## Benefits of FrankenPHP

![image](/assets/images/posts/franken_php_worker_mode.png){: style="float: left"}
One of the main benefits of FrankenPHP is its **worker mode**. This feature allows you to boot your application once and keep it in memory, ready to handle incoming requests in a few milliseconds. This eliminates the overhead of spawning new processes or threads for each request, as well as the cold start problem. FrankenPHP relies on Go's iconic feature: goroutines. Each request is handled by a lightweight goroutine, which can scale up to millions of concurrent connections.

Another benefit of FrankenPHP is its support for real-time communication. FrankenPHP has a built-in Mercure hub, which is a protocol for sending events from your PHP apps to all connected browsers, using Server-Sent Events (SSE) or WebSockets. You can use this feature to create interactive and dynamic web apps, such as chat, notifications, live updates, and more. You can also use the Mercure protocol to communicate between different services or microservices, using the Pub/Sub pattern.

FrankenPHP is also a Cloud Native application, which means that it is designed to run on modern cloud platforms, such as Kubernetes, Docker, or Heroku. You can deploy your PHP apps with zero downtime, thanks to graceful reloads and automatic HTTPS certificate generation, renewal, and revocation. You can also improve your website load times by 30%, using Early Hints, a brand new feature of the web platform that can send hints to the browser before the main response is ready. FrankenPHP is the only PHP SAPI with Early Hints support.

## How to Get Started with FrankenPHP

FrankenPHP is an open source project, created by Kévin Dunglas, a Symfony core team member and creator of API Platform. You can find more information about FrankenPHP on its official website², GitHub repository³, or documentation⁴. You can also watch the presentation of FrankenPHP at the ForumPHP conference⁵. If you are interested in trying out FrankenPHP, you can download the latest release from the website, or use the Docker image. You can also contribute to the project by reporting issues, submitting pull requests, or sponsoring the development.

FrankenPHP is a new way to run PHP apps with Go, that combines the best of both worlds. It offers performance, scalability, simplicity, and modern features, without compromising compatibility or security. Whether you are a PHP developer, a Go developer, or both, you should give FrankenPHP a try and see for yourself how it can improve your web development experience.

If you have any feedback or questions, please let me know. 😊


## Reference


* 1 [FrankenPHP : The Modern Php App Server, written in Go.](https://frankenphp.dev/)
* 2 [FrankenPHP: The modern PHP app server.](https://frankenphp.dev/)
* 3 [FrankenPHP: The Modern Php App Server, written in Go.](https://dunglas.dev/2022/10/frankenphp-the-modern-php-app-server-written-in-go/)
* 4 [FrankenPHP: A modern app server for PHP and Symfony apps.](https://speakerdeck.com/dunglas/frankenphp-a-modern-app-server-for-php-and-symfony-apps)
* [Reddit Discussion](https://www.reddit.com/r/PHP/comments/17p4jem/github_dunglasfrankenphp_the_modern_php_app_server/)
