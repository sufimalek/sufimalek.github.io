---
layout: post
title: Go Fan-Out / Fan-In Pattern
excerpt: "Go Fan-Out / Fan-In Pattern Guide"
author: 
date: 2025-08-20
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

Imagine you have a big box of toy blocks, and you want to paint each block a different color. But painting each one by yourself would take a long time. So, you ask your friends to help! The **Fan-Out / Fan-In** pattern in Go is like this: you split the work (painting blocks) among many friends (Fan-Out), and then you collect all their finished work (Fan-In) to put it together.

Let’s break it down like a fun game:

### What is Fan-Out / Fan-In?
- **Fan-Out**: You give each friend a few blocks to paint (spreading the work to many workers).
- **Fan-In**: After they’re done, you collect all the painted blocks into one big pile (combining the results).

This pattern is used in Go to do tasks faster by using multiple "workers" (like goroutines) to process things at the same time, then gathering the results.

### Easy Example
Let’s say we want to count the total number of letters in a bunch of words. Instead of counting one word at a time, we’ll use the Fan-Out / Fan-In pattern to split the work and make it faster.

### Steps to Implement in Go
Here’s how we can do it, step by step, like building a toy tower:

1. **Make a List of Words**: We’ll have a list of words like `["cat", "dog", "fish", "bird"]`.
2. **Fan-Out**: Send each word to a different "worker" (goroutine) to count its letters.
3. **Fan-In**: Collect all the letter counts and add them up to get the total.

### Simple Go Code
Here’s the code explained like a story:

```go
package main

import (
    "fmt"
    "sync"
)

// Step 1: This is our "worker" that counts letters in one word
func countLetters(word string, results chan<- int, wg *sync.WaitGroup) {
    // Tell the WaitGroup this worker is done when we finish
    defer wg.Done()
    // Count the letters in the word
    count := len(word)
    // Send the count to the results channel
    results <- count
}

func main() {
    // Our list of words (like our toy blocks)
    words := []string{"cat", "dog", "fish", "bird"}
    
    // Step 2: Create a channel to collect results
    results := make(chan int, len(words))
    
    // Step 3: Create a WaitGroup to wait for all workers
    var wg sync.WaitGroup
    
    // Step 4: Fan-Out - Send each word to a worker
    for _, word := range words {
        wg.Add(1) // Add one worker to the WaitGroup
        go countLetters(word, results, &wg) // Start a worker
    }
    
    // Step 5: Close the results channel when all workers are done
    go func() {
        wg.Wait() // Wait for all workers to finish
        close(results) // Close the channel
    }()
    
    // Step 6: Fan-In - Collect all results and add them up
    total := 0
    for count := range results {
        total += count
    }
    
    // Step 7: Show the final result
    fmt.Printf("Total number of letters: %d\n", total)
}
```

### How It Works (Like Explaining to a Kid)
1. **Words Are Blocks**: Each word (`cat`, `dog`, etc.) is like a block we need to count.
2. **Workers Are Friends**: Each worker (goroutine) is like a friend who counts the letters in one word.
3. **Channel Is a Basket**: The `results` channel is like a basket where workers put their counts.
4. **WaitGroup Is a Checklist**: The `sync.WaitGroup` is like a checklist to make sure all friends finish before we close the basket.
5. **Fan-Out**: We give each word to a different friend to count at the same time.
6. **Fan-In**: We take all the counts from the basket and add them up to get the total.

### What Happens When You Run It?
- `cat` has 3 letters.
- `dog` has 3 letters.
- `fish` has 4 letters.
- `bird` has 4 letters.
- Total = 3 + 3 + 4 + 4 = **14 letters**.

When you run the code, it will print: `Total number of letters: 14`.

### Why Is This Cool?
- **Fast**: Instead of counting one word at a time, we count all words at once using goroutines.
- **Organized**: The channel and WaitGroup make sure we don’t lose any counts and wait for everyone to finish.

### Try It Yourself!
1. Copy the code into a file (like `main.go`).
2. Run it with `go run main.go`.
3. Try changing the words (e.g., add `"elephant"`) and see the new total!

This pattern is super useful when you have lots of work (like counting, downloading, or processing) and want to do it faster by splitting it up.