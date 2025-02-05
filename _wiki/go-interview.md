---
layout: wiki
title: GO Lang
cate1: Interview
cate2: 
description: GO Wiki
keywords: GO
---

#### **Q: What is the difference between a slice and an array in Go?**  

⭐ **Answer:**  
In Go, an **array** has a fixed size, meaning its length is defined at the time of declaration and cannot be changed.  

A **slice**, on the other hand, is a dynamically sized, flexible view into an array. It provides additional functionality, such as resizing and appending elements, through the built-in `append` function.  

Key differences:  
1. **Size:** Arrays have a fixed size, while slices can grow and shrink dynamically.  
2. **Memory Efficiency:** Slices use an underlying array but allow modification without reallocating memory.  
3. **Usage:** Arrays are rarely used directly, whereas slices are widely used due to their flexibility.  

Example:  
```go
arr := [3]int{1, 2, 3} // Array with a fixed size of 3
slice := []int{1, 2, 3} // Slice without a fixed size
slice = append(slice, 4) // Valid for slices, but not for arrays
```

---

#### **Q: What is a goroutine in Go?**  

⭐ **Answer:**  
A **goroutine** is a lightweight, independently executing function in Go, managed by the Go runtime. It enables concurrent execution with minimal memory and scheduling overhead. 

Goroutines are managed by the Go runtime, which schedules them efficiently using a **multiplexing model**, meaning thousands of goroutines can run on a few OS threads.  

To start a goroutine, we use the `go` keyword:  
```go
func sayHello() {
    fmt.Println("Hello from goroutine!")
}

func main() {
    go sayHello() // Runs concurrently
    fmt.Println("Main function")
}
```  
Here, `sayHello()` runs asynchronously, while `main()` continues execution.  

Key points:  
1. **Efficient and lightweight:** Goroutines consume very little memory and are managed by the runtime.  
2. **Non-blocking execution:** They execute independently, making Go highly concurrent.  
3. **Requires synchronization:** Since goroutines run in parallel, we use **channels** or **sync.WaitGroup** to manage execution order.  

<!-- Would you like me to explain goroutine scheduling or how to prevent race conditions? -->

---

#### **Q: What is the difference between a thread and a goroutine in Go?**

⭐ **Answer:**  
A **thread** is an OS-managed unit of execution, whereas a **goroutine** is a lightweight, user-space thread managed by the Go runtime. Goroutines provide a more efficient way to handle concurrency compared to traditional OS threads.  

**Key Differences:**  

1. **Memory Consumption:**  
   - Threads have a large memory footprint, typically several MBs per thread.  
   - Goroutines are lightweight, starting with a few KBs of stack memory and growing dynamically as needed.  

2. **Scheduling:**  
   - Threads are scheduled by the **operating system’s kernel**, which involves expensive context switching.  
   - Goroutines are scheduled by Go’s **M:N scheduler**, which efficiently multiplexes thousands of goroutines onto a few OS threads, reducing context-switching overhead.  

3. **Creation and Performance:**  
   - Creating a new thread is expensive because it requires system calls.  
   - Creating a goroutine is cheap, as the Go runtime handles them without direct OS intervention.  

4. **Concurrency Model:**  
   - Threads require explicit synchronization mechanisms like **mutexes, semaphores, and locks** to share data safely.  
   - Goroutines use **channels** to communicate safely, reducing the risk of race conditions.  

5. **Blocking Behavior:**  
   - A blocked thread prevents execution unless explicitly handled with non-blocking techniques.  
   - A blocked goroutine doesn’t block the entire program because the Go scheduler efficiently manages execution by moving goroutines between OS threads.  

**Goroutine in Go:**  
```go
package main

import (
    "fmt"
    "time"
)

func printMessage() {
    fmt.Println("Hello from goroutine!")
}

func main() {
    go printMessage() // Goroutine starts
    time.Sleep(time.Millisecond) // Allows goroutine to complete
}
```
- Uses the `go` keyword to start a goroutine.  
- The Go runtime schedules and manages execution efficiently.  

**Why Goroutines Are Preferred?**  
- **Scalability:** A Go program can handle **millions of goroutines**, whereas creating thousands of OS threads would be impr

This makes goroutines highly efficient for concurrent programming in Go.

---

#### **Q: What is `context` in Golang?**  

⭐ **Answer:**  
In Go, the `context` package provides a way to control and manage the **lifetime, deadlines, timeouts, and cancellation** of goroutines, making it essential for handling long-running operations and request-scoped data.  

 **Why is `context` needed?**  
When working with concurrent operations like HTTP requests, database calls, or background tasks, we often need to:  
1. **Set timeouts** to avoid indefinitely running processes.  
2. **Propagate cancellations** to prevent resource leaks.  
3. **Pass request-scoped values** across function calls.  

 **Types of Contexts:**  
1. **`context.Background()`** → Used as the base context, typically at the start of a program.  
2. **`context.TODO()`** → Used when context is required but not yet defined.  
3. **`context.WithCancel(parent)`** → Creates a new context that can be manually canceled.  
4. **`context.WithTimeout(parent, duration)`** → Cancels automatically after a set duration.  
5. **`context.WithDeadline(parent, time)`** → Cancels at a specific time.  
6. **`context.WithValue(parent, key, value)`** → Attaches key-value pairs to context.  

 **Example: Using `context.WithTimeout`**  
```go
package main

import (
    "context"
    "fmt"
    "time"
)

func fetchData(ctx context.Context) {
    select {
    case <-time.After(3 * time.Second): // Simulate a long-running task
        fmt.Println("Data fetched")
    case <-ctx.Done(): // Context timeout or cancellation
        fmt.Println("Request canceled:", ctx.Err())
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel() // Ensure cancellation to free resources

    go fetchData(ctx)

    time.Sleep(3 * time.Second) // Wait for goroutine to complete
}
```
 **Output:**  
```
Request canceled: context deadline exceeded
```
- The function gets **canceled after 2 seconds** instead of waiting for 3 seconds.  

 **Key Benefits of `context` in Go:**  
✔ **Graceful shutdown of goroutines**  
✔ **Prevents resource leaks**  
✔ **Efficient request handling** in web servers  
✔ **Time-sensitive operations** like database queries  

more details about context : [Understanding GoLang Context](/post/golang-context){:target="_blank"}

---


**Q: What are pointers in Go, and what are their uses?**  

⭐ **Answer:**  
In Go, a **pointer** is a variable that stores the **memory address** of another variable, rather than the value itself. Pointers allow you to **reference** and **manipulate** variables indirectly, making them a powerful tool in Go programming.  

**How Pointers Work:**
- When you declare a variable, the **pointer** holds the memory address of that variable, rather than the actual value.  
- You can use **the `&` operator** to obtain the memory address of a variable and **the `*` operator** to dereference the pointer, accessing the value stored at that address.

**Syntax Example:**
```go
package main

import "fmt"

func main() {
    x := 42            // A variable with an integer value
    ptr := &x          // A pointer to the memory address of x

    fmt.Println(x)      // Output: 42
    fmt.Println(ptr)    // Output: memory address of x
    fmt.Println(*ptr)   // Output: 42 (dereferencing the pointer)
}
```

More details: [GoLang Pointers](/post/golang-pointers){:target="_blank"}

---

#### **Q: What is synchronous in Go?**  

⭐ **Answer:**  
In Go, **synchronous** execution refers to operations that happen in a **sequential, blocking manner**. When a function or task is executed synchronously, it **blocks the execution of the next operation** until the current operation is completed. In other words, the program waits for the current operation to finish before moving on to the next one.

**How Synchronous Execution Works in Go:**
In a synchronous program, each operation must complete before the next one starts. If one function or task takes a long time, it can cause delays in the program since each task waits for the one before it to finish.

**Example of Synchronous Execution:**
```go
package main

import (
    "fmt"
    "time"
)

func task1() {
    fmt.Println("Task 1 started")
    time.Sleep(2 * time.Second) // Simulate a task taking 2 seconds
    fmt.Println("Task 1 completed")
}

func task2() {
    fmt.Println("Task 2 started")
    time.Sleep(1 * time.Second) // Simulate a task taking 1 second
    fmt.Println("Task 2 completed")
}

func main() {
    task1() // Executes synchronously (blocks the next task)
    task2() // Waits until task1 is done before starting
}
```

**Output:**
```
Task 1 started
Task 1 completed
Task 2 started
Task 2 completed
```

**Explanation:**
- The `task1()` function runs and blocks the program for **2 seconds** because of `time.Sleep()`.
- Only after `task

---

### **Q: What is rate limiting in Go?**  

⭐ **Answer:**  
**Rate limiting** in Go refers to the practice of **controlling the rate at which certain actions or requests can be made** over a given period of time. It is commonly used in networking, APIs, and services to ensure that resources are not overwhelmed by too many requests within a short time frame.

Rate limiting is essential for:
- **Preventing abuse** (e.g., preventing DDoS attacks or excessive API calls)
- **Ensuring fair usage** of resources (e.g., distributing bandwidth evenly)
- **Maintaining system performance** by controlling the load

More details: [GoLang Rate Limiter](/post/golang-rate-limiter){:target="_blank"}