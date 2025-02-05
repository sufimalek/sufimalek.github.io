---
layout: post
title: "Rate Limiter in Golang"
excerpt: "**Rate limiting** in Go refers to the practice of **controlling the rate at which certain actions or requests can be made** over a given period of time. It is commonly used in networking, APIs, and services to ensure that resources are not overwhelmed by too many requests within a short time frame."
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

**Rate limiting** in Go refers to the practice of **controlling the rate at which certain actions or requests can be made** over a given period of time. It is commonly used in networking, APIs, and services to ensure that resources are not overwhelmed by too many requests within a short time frame.

Rate limiting is essential for:
- **Preventing abuse** (e.g., preventing DDoS attacks or excessive API calls)
- **Ensuring fair usage** of resources (e.g., distributing bandwidth evenly)
- **Maintaining system performance** by controlling the load

### **Common Techniques for Rate Limiting:**

1. **Token Bucket Algorithm:**  
   This algorithm allows for bursts of requests but has a set rate limit for how many requests can be processed within a given time period. Tokens are added to the bucket at a fixed rate, and when a request is made, it consumes a token. If no tokens are available, the request is denied or delayed.

2. **Leaky Bucket Algorithm:**  
   Similar to the token bucket, but the rate of processing is fixed. Requests are queued, and the bucket "leaks" at a constant rate. If the bucket overflows, the requests are discarded or delayed.

3. **Fixed Window:**  
   This method limits the number of requests in a fixed time window (e.g., 100 requests per minute). Once the limit is reached, requests are denied until the next window.

4. **Sliding Window:**  
   A more advanced method that limits the number of requests within a sliding time window, smoothing out spikes while maintaining fairness over time.

### **Rate Limiting in Go (Example with `time.Ticker`):**

In Go, you can implement rate limiting using the `time.Ticker` or `time.After` to control the frequency of actions or requests. Here’s an example using `time.Ticker` to allow a certain number of requests per second.

### **Example: Rate Limiting with `time.Ticker`**  
```go
package main

import (
    "fmt"
    "time"
)

func rateLimitedTask(ticker *time.Ticker, quit chan struct{}) {
    for {
        select {
        case <-ticker.C: // Executes task at regular intervals
            fmt.Println("Performing a task at:", time.Now())
        case <-quit:
            fmt.Println("Rate limiting stopped.")
            return
        }
    }
}

func main() {
    ticker := time.NewTicker(500 * time.Millisecond) // Limit to 2 actions per second
    quit := make(chan struct{})

    go rateLimitedTask(ticker, quit)

    // Simulate running for 5 seconds
    time.Sleep(5 * time.Second)

    // Stop rate limiting
    ticker.Stop()
    quit <- struct{}{}
}
```

### **Output:**
```
Performing a task at: 2025-02-05 10:00:01.001234
Performing a task at: 2025-02-05 10:00:01.501234
Performing a task at: 2025-02-05 10:00:02.001234
Performing a task at: 2025-02-05 10:00:02.501234
Performing a task at: 2025-02-05 10:00:03.001234
Rate limiting stopped.
```

### **Explanation:**
- The **rate limiting** is achieved using `time.NewTicker(500 * time.Millisecond)`, which ticks every 500 milliseconds, limiting the task to **2 executions per second**.
- The `rateLimitedTask` function runs in a goroutine, performing an action at regular intervals.
- After 5 seconds, the ticker is stopped, and the rate-limited task stops executing.

### **Real-World Use Cases:**
1. **API Rate Limiting:** To control the number of requests an API can handle from a user, ensuring fair usage and preventing overloading of servers.
2. **User Login Attempts:** To limit the number of login attempts per minute to prevent brute-force attacks.
3. **Request Throttling:** In systems where multiple services need to talk to each other but need to avoid overwhelming the receiving service.

### **Key Benefits of Rate Limiting:**
- **Prevents system overloads** by controlling the rate of incoming requests.
- **Ensures fair access** to services, preventing a single user from monopolizing resources.
- **Enhances security** by mitigating the risk of DoS (Denial of Service) or brute-force attacks.

Would you like to explore more advanced rate-limiting techniques or libraries available in Go?

### **Conclusion**

Keep Coding! 😊

## Reference
