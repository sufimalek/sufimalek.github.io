---
layout: wiki
title: Singleton Pattern
cate1: Basis
cate2: Design Patterns
description: Design Patterns - Singleton Pattern
keywords: Basis
---

## solved problem

1. limit unique instances

2. Provides a way to easily access instances globally

## Comparison with static classes

1. When is it better to use static classes

    For example, tool classes like java.lang.Math do not maintain any state and only provide global method access. It is better to use static classes at this time, because method calls are bound at compile time.

    It is not recommended to use static classes to maintain state information, especially in a concurrent environment where race conditions are prone to occur.

2. Difference between static class and singleton

    * Static classes have better performance because method calls are bound at compile time.
    * If you need to maintain state, using a singleton is more appropriate.
    * Singletons can be lazy loaded if the object is large.

3. Advantages of singletons

    More object-oriented. You can enjoy the convenience of inheritance and polymorphism by inheriting base classes and implementing interfaces.

If you just need a collection of static methods, use a static class, otherwise use a singleton.

## refer to

* Difference between Singleton Pattern vs Static Class
