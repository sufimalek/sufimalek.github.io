---
layout: wiki
title: Thread-safe and reentrant
cate1: Basis
cate2:
description: Thread-safe and reentrant
keywords: Basis
---

Reentrant functions are not necessarily thread-safe, and thread-safe functions are not necessarily reentrant.

## Thread safety

Thread safety means that when a function or library is called in a multi-threaded environment, it can correctly handle the shared variables between multiple threads to make the program function complete correctly.

## Reentrant

A program or subprogram is said to be reentrant if it can be "broken at any point and then the operating system debugs and executes another piece of code, which again calls the subroutine without error". That is, when the subroutine is running, the thread of execution can enter and execute it again, still getting the results expected at design time. Unlike thread safety, where multiple threads execute concurrently, reentrancy emphasizes that it is still safe to re-enter the same subroutine when a single thread executes.

If a function is reentrant, it should meet the following conditions:

* Cannot contain static (global) non-constant data.
* You cannot return the address of static (global) non-constant data.
* Only data provided by the caller can be processed.
* You cannot rely on locks for single-instance mode resources.
* The function called must also be reentrant.

## Reference

* [Thread safety](https://en.wikipedia.org/wiki/Thread_safety)
* [Reentrant](https://en.wikipedia.org/wiki/Reentrancy_(computing))
