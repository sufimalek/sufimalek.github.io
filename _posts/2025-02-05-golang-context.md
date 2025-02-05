---
layout: post
title: "context in Golang"
excerpt: "In Go, the context package provides a way to control and manage the lifetime, deadlines, timeouts, and cancellation of goroutines, making it essential for handling long-running operations and request-scoped data."
author: 
date: 2025-02-05
categories: [golang]
tags: [golang]
pin: true
keywords: [golang]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


**Q: What is `context` in Golang?**  

⭐ **Answer:**  
In Go, the `context` package provides a way to control and manage the **lifetime, deadlines, timeouts, and cancellation** of goroutines, making it essential for handling long-running operations and request-scoped data.  

### **Why is `context` needed?**  
When working with concurrent operations like HTTP requests, database calls, or background tasks, we often need to:  
1. **Set timeouts** to avoid indefinitely running processes.  
2. **Propagate cancellations** to prevent resource leaks.  
3. **Pass request-scoped values** across function calls.  

### **Types of Contexts:**  
1. **`context.Background()`** → Used as the base context, typically at the start of a program.  
2. **`context.TODO()`** → Used when context is required but not yet defined.  
3. **`context.WithCancel(parent)`** → Creates a new context that can be manually canceled.  
4. **`context.WithTimeout(parent, duration)`** → Cancels automatically after a set duration.  
5. **`context.WithDeadline(parent, time)`** → Cancels at a specific time.  
6. **`context.WithValue(parent, key, value)`** → Attaches key-value pairs to context.  

### **Example: Using `context.WithTimeout`**  
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
### **Output:**  
```
Request canceled: context deadline exceeded
```
- The function gets **canceled after 2 seconds** instead of waiting for 3 seconds.  

### **Key Benefits of `context` in Go:**  
✔ **Graceful shutdown of goroutines**  
✔ **Prevents resource leaks**  
✔ **Efficient request handling** in web servers  
✔ **Time-sensitive operations** like database queries  

more about how `context` is used in real-world applications:

### **Real-World Use Cases of `context` in Golang**  

In real-world applications, the `context` package is widely used for managing **timeouts, cancellations, and request-scoped data** in concurrent operations. Let’s go through some common scenarios where `context` is essential.  

---

## **1. Handling HTTP Requests with Context (Graceful API Timeouts)**  

When an API request takes too long (e.g., due to a slow database query), we can **set a timeout** using `context.WithTimeout` to **prevent the server from hanging indefinitely**.  

### **Example: API with Timeout Handling**
```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

// Simulating a slow database query
func fetchFromDatabase(ctx context.Context) (string, error) {
    select {
    case <-time.After(3 * time.Second): // Simulate a long-running query
        return "Data fetched", nil
    case <-ctx.Done(): // Context timeout or cancellation
        return "", ctx.Err()
    }
}

func handler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second) // Set request timeout
    defer cancel()

    data, err := fetchFromDatabase(ctx)
    if err != nil {
        http.Error(w, "Request timed out", http.StatusGatewayTimeout)
        return
    }

    fmt.Fprintln(w, data)
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server started at :8080")
    http.ListenAndServe(":8080", nil)
}
```
### **What Happens Here?**
- The API **automatically cancels** the request if it takes **longer than 2 seconds**.  
- The database query was supposed to take **3 seconds**, so it gets canceled.  
- This **prevents blocking** server resources for too long.  

---

## **2. Graceful Shutdown of a Server**  

When shutting down a server (e.g., during a deployment), we need to **clean up resources** and ensure **ongoing requests complete gracefully** before terminating.  

### **Example: Graceful Shutdown Using Context**  
```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello, World!")
}

func main() {
    srv := &http.Server{Addr: ":8080", Handler: http.DefaultServeMux}

    go func() {
        fmt.Println("Server started at :8080")
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            fmt.Println("Server error:", err)
        }
    }()

    // Listen for OS signals (e.g., Ctrl+C, Kubernetes shutdown)
    stop := make(chan os.Signal, 1)
    signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

    <-stop // Wait for termination signal

    // Shutdown with a timeout
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    fmt.Println("Shutting down server...")
    if err := srv.Shutdown(ctx); err != nil {
        fmt.Println("Error shutting down server:", err)
    }
    fmt.Println("Server gracefully stopped")
}
```
### **Why Use Context Here?**
- Ensures the server **completes ongoing requests** before shutting down.  
- Uses **OS signals** to detect termination (Ctrl+C or Docker/Kubernetes stop).  
- `context.With



### **Conclusion**

Keep Coding! 😊

## Reference
