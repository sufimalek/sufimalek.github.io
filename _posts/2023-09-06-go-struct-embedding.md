---
layout: post
title: "Embedding Struct in Go"
excerpt: When you embed a struct within another struct, the fields and methods of the embedded struct become part of the outer struct. You can access these fields and methods directly from the outer struct.
author: 
# date: 2023-09-08 07:10:00 +0800
categories: [Golang]
tags: [go, struct, go-lang]
pin: true
keywords: go, go-lang
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


<span class="dropcap-element-slot">I</span>n Go, a `struct` is a composite data type that groups together variables (fields) under a single name. Structs are used to create custom data structures, similar to classes in other languages. You can also embed one struct within another struct to compose more complex data structures. This concept is known as "embedding" in Go.

Here's an example of embedding in Go, along with its benefits, understanding, and conclusion:

### Example of Embedding in Go:

Let's say you're building a system to manage different types of vehicles. You can create a base `Vehicle` struct and then embed it within more specific vehicle types like `Car` and `Motorcycle`:

```go
package main

import "fmt"

// Base Vehicle struct
type Vehicle struct {
    Brand string
    Year  int
}

// Car struct embedded with Vehicle
type Car struct {
    Vehicle
    Model string
}

// Motorcycle struct embedded with Vehicle
type Motorcycle struct {
    Vehicle
    Type string
}

func main() {
    myCar := Car{
        Vehicle: Vehicle{
            Brand: "Toyota",
            Year:  2020,
        },
        Model: "Camry",
    }

    myMotorcycle := Motorcycle{
        Vehicle: Vehicle{
            Brand: "Harley-Davidson",
            Year:  2021,
        },
        Type: "Sportster",
    }

    fmt.Println("Car:", myCar.Brand, myCar.Model, myCar.Year)
    fmt.Println("Motorcycle:", myMotorcycle.Brand, myMotorcycle.Type, myMotorcycle.Year)
}
```

In this example, `Car` and `Motorcycle` structs embed the `Vehicle` struct. This allows them to inherit the fields and methods of the embedded struct while adding their own unique fields (`Model` for `Car` and `Type` for `Motorcycle`).

### Benefits of Embedding in Go:

1. **Code Reusability:** Embedding allows you to reuse existing structs within other structs, reducing code duplication and making your codebase more maintainable.

2. **Composition:** You can create complex data structures by composing simpler ones. This promotes a modular and organized design.

3. **Method Inheritance:** Methods defined on the embedded struct are automatically inherited by the outer struct, enabling you to create shared behavior among different types.

4. **Simpler Syntax:** Accessing embedded fields is simple and concise, making it easier to work with nested structures.

### Understanding Embedding:

When you embed a struct within another struct, the fields and methods of the embedded struct become part of the outer struct. You can access these fields and methods directly from the outer struct, as demonstrated in the example above.

### Conclusion:

Embedding in Go is a powerful feature that enables code reuse, composition, and method inheritance. It encourages a clean and modular design by allowing you to build complex data structures from simpler ones. Understanding when and how to use embedding can lead to more maintainable and organized code in your Go applications.