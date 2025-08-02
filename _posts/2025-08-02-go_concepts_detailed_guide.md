---
layout: post
title: Complete Go Interview Preparation
excerpt: "Complete Go Interview Preparation - Detailed Topic Guide"
author: 
date: 2025-03-09
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


# Complete Go Interview Preparation - Detailed Topic Guide

## Week 1: Foundation & Syntax Mastery

### Day 1-2: Go Basics

#### Variables and Constants
Go uses static typing with type inference. Variables can be declared in multiple ways:

```go
// Explicit type declaration
var name string = "John"
var age int = 30

// Type inference
var name = "John"
var age = 30

// Short declaration (inside functions only)
name := "John"
age := 30

// Multiple variable declaration
var (
    name string = "John"
    age  int    = 30
)
```

**Constants** are immutable values known at compile time:
```go
const Pi = 3.14159
const (
    StatusOK = 200
    StatusNotFound = 404
)

// iota for auto-incrementing constants
const (
    Sunday = iota    // 0
    Monday           // 1
    Tuesday          // 2
)
```

**Key Interview Points:**
- Zero values: `0` for numbers, `""` for strings, `false` for bools, `nil` for pointers/maps/slices/channels
- Constants are evaluated at compile time
- `iota` resets to 0 in each const block

#### Functions
Functions are first-class citizens in Go:

```go
// Basic function
func add(a, b int) int {
    return a + b
}

// Multiple return values
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // naked return
}

// Variadic functions
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

// Function as type
type Calculator func(int, int) int

func operate(calc Calculator, a, b int) int {
    return calc(a, b)
}
```

**Key Interview Points:**
- Functions can return multiple values (common pattern: value, error)
- Named returns can improve readability but use sparingly
- Variadic functions use `...` syntax
- Functions are types and can be passed as parameters

#### Control Structures

**If statements:**
```go
// Basic if
if x > 0 {
    fmt.Println("positive")
}

// If with initialization
if err := doSomething(); err != nil {
    return err
}

// If-else chain
if x > 0 {
    fmt.Println("positive")
} else if x < 0 {
    fmt.Println("negative")
} else {
    fmt.Println("zero")
}
```

**For loops (only loop in Go):**
```go
// Traditional for loop
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// While-style loop
for condition {
    // loop body
}

// Infinite loop
for {
    // loop body
    if shouldBreak {
        break
    }
}

// Range loop
for index, value := range slice {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}
```

**Switch statements:**
```go
// Basic switch
switch day {
case "Monday":
    fmt.Println("Start of work week")
case "Friday":
    fmt.Println("TGIF")
default:
    fmt.Println("Regular day")
}

// Switch with expression
switch {
case x < 0:
    fmt.Println("negative")
case x == 0:
    fmt.Println("zero")
default:
    fmt.Println("positive")
}

// Type switch
switch v := interface{}(x).(type) {
case int:
    fmt.Printf("Integer: %d\n", v)
case string:
    fmt.Printf("String: %s\n", v)
default:
    fmt.Printf("Unknown type: %T\n", v)
}
```

### Day 3-4: Data Structures & Types

#### Arrays vs Slices

**Arrays** are fixed-size, value types:
```go
// Array declaration
var arr [5]int                    // [0 0 0 0 0]
arr2 := [5]int{1, 2, 3, 4, 5}    // [1 2 3 4 5]
arr3 := [...]int{1, 2, 3}        // [1 2 3] - compiler counts

// Arrays are value types
func modifyArray(arr [3]int) {
    arr[0] = 100  // This won't affect the original
}
```

**Slices** are dynamic, reference types:
```go
// Slice creation
var slice []int                   // nil slice
slice = make([]int, 5)           // [0 0 0 0 0]
slice = make([]int, 5, 10)       // length 5, capacity 10
slice = []int{1, 2, 3, 4, 5}     // slice literal

// Slice operations
slice = append(slice, 6)          // Add elements
subSlice := slice[1:4]           // [2 3 4] - slicing
copy(dest, src)                  // Copy elements

// Slice internals
fmt.Printf("len=%d cap=%d\n", len(slice), cap(slice))
```

**Key Interview Points:**
- Arrays are value types, slices are reference types
- Slice header contains pointer, length, and capacity
- `append()` may reallocate if capacity exceeded
- Slicing creates new slice header but shares underlying array

#### Maps
Hash tables in Go:

```go
// Map creation
var m map[string]int              // nil map
m = make(map[string]int)          // empty map
m = map[string]int{               // map literal
    "apple":  5,
    "banana": 3,
}

// Map operations
m["orange"] = 7                   // Set value
value := m["apple"]               // Get value
value, ok := m["grape"]           // Check existence
delete(m, "banana")               // Delete key

// Iterate over map
for key, value := range m {
    fmt.Printf("%s: %d\n", key, value)
}
```

**Key Interview Points:**
- Maps are reference types
- Zero value is `nil`
- Keys must be comparable types
- Iteration order is not guaranteed
- Use comma ok idiom to check existence

#### Structs and Methods

**Structs** are composite types:
```go
// Struct definition
type Person struct {
    Name string
    Age  int
    Email string
}

// Struct creation
p1 := Person{Name: "John", Age: 30, Email: "john@example.com"}
p2 := Person{"Jane", 25, "jane@example.com"}  // positional
var p3 Person  // zero value

// Anonymous structs
config := struct {
    Host string
    Port int
}{
    Host: "localhost",
    Port: 8080,
}
```

**Methods** are functions with receivers:
```go
// Value receiver
func (p Person) String() string {
    return fmt.Sprintf("%s (%d)", p.Name, p.Age)
}

// Pointer receiver (can modify)
func (p *Person) SetAge(age int) {
    p.Age = age
}

// Method set rules
var p Person
p.SetAge(31)      // Go automatically takes address
(&p).SetAge(31)   // Equivalent

var ptr *Person = &p
ptr.String()      // Go automatically dereferences
(*ptr).String()   // Equivalent
```

**Key Interview Points:**
- Value receivers work on copies
- Pointer receivers can modify the original
- Go automatically handles pointer/value conversion for method calls
- Method sets determine interface satisfaction

#### Pointers Fundamentals

```go
// Pointer basics
var x int = 42
var p *int = &x        // p points to x
fmt.Println(*p)        // Dereference: prints 42
*p = 100              // Modify value through pointer

// Zero value of pointer is nil
var ptr *int
if ptr == nil {
    fmt.Println("ptr is nil")
}

// new() function
ptr = new(int)         // Allocates zero value and returns pointer
*ptr = 42

// Pointer arithmetic is NOT allowed
// ptr++  // This is invalid in Go
```

**Key Interview Points:**
- No pointer arithmetic (safer than C/C++)
- Automatic garbage collection
- Pass by value vs pass by reference semantics
- When to use pointers vs values

### Day 5-6: Functions & Interfaces

#### Function Types and Closures

```go
// Function as type
type BinaryOp func(int, int) int

func add(a, b int) int { return a + b }
func multiply(a, b int) int { return a * b }

func calculate(op BinaryOp, x, y int) int {
    return op(x, y)
}

// Usage
result := calculate(add, 5, 3)      // 8
result = calculate(multiply, 5, 3)  // 15

// Anonymous functions
square := func(x int) int {
    return x * x
}

// Closures
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

c := counter()
fmt.Println(c()) // 1
fmt.Println(c()) // 2
```

#### Interfaces Deep Dive

**Basic Interface Concepts:**
```go
// Interface definition
type Writer interface {
    Write([]byte) (int, error)
}

type Reader interface {
    Read([]byte) (int, error)
}

// Interface composition
type ReadWriter interface {
    Reader
    Writer
}

// Implementation (implicit)
type File struct {
    name string
}

func (f *File) Write(data []byte) (int, error) {
    // Implementation
    return len(data), nil
}

func (f *File) Read(data []byte) (int, error) {
    // Implementation
    return len(data), nil
}

// File automatically implements Writer, Reader, and ReadWriter
```

**Empty Interface:**
```go
// interface{} can hold any value
var i interface{}
i = 42
i = "hello"
i = []int{1, 2, 3}

// Type assertion
value, ok := i.(int)
if ok {
    fmt.Printf("i is an int: %d\n", value)
}

// Type switch
switch v := i.(type) {
case int:
    fmt.Printf("Integer: %d\n", v)
case string:
    fmt.Printf("String: %s\n", v)
default:
    fmt.Printf("Unknown type: %T\n", v)
}
```

**Key Interview Points:**
- Interfaces are satisfied implicitly
- Empty interface can hold any value
- Interface values have dynamic type and value
- Type assertions and type switches for type checking
- Interface segregation principle

## Week 2: Concurrency & Advanced Concepts

### Day 8-9: Goroutines Fundamentals

#### Goroutines vs Threads
```go
// Creating goroutines
func sayHello() {
    fmt.Println("Hello from goroutine!")
}

func main() {
    // Start goroutine
    go sayHello()
    
    // Anonymous goroutine
    go func() {
        fmt.Println("Anonymous goroutine")
    }()
    
    // Goroutine with parameters
    go func(name string) {
        fmt.Printf("Hello, %s!\n", name)
    }("World")
    
    time.Sleep(time.Second) // Wait for goroutines
}
```

**Key Differences from Threads:**
- Lightweight (2KB initial stack vs 2MB for threads)
- Managed by Go runtime scheduler
- Multiplexed onto OS threads (M:N scheduling)
- Cheap to create (thousands or millions possible)

#### Race Conditions and Synchronization

**Race Condition Example:**
```go
var counter int

func increment() {
    for i := 0; i < 1000; i++ {
        counter++ // Race condition!
    }
}

func main() {
    go increment()
    go increment()
    time.Sleep(time.Second)
    fmt.Println(counter) // Unpredictable result
}
```

**Using Mutex:**
```go
var (
    counter int
    mu      sync.Mutex
)

func safeIncrement() {
    for i := 0; i < 1000; i++ {
        mu.Lock()
        counter++
        mu.Unlock()
    }
}
```

**Using RWMutex:**
```go
type SafeCounter struct {
    mu sync.RWMutex
    counters map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.counters[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.counters[key]
}
```

**WaitGroup for Synchronization:**
```go
func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup
    
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    
    wg.Wait()
    fmt.Println("All workers completed")
}
```

### Day 10-11: Channels Deep Dive

#### Channel Basics
```go
// Channel creation
ch := make(chan int)        // Unbuffered channel
buffered := make(chan int, 5) // Buffered channel

// Channel operations
ch <- 42          // Send
value := <-ch     // Receive
value, ok := <-ch // Receive with ok (false if closed)

// Closing channels
close(ch)

// Channel directions (function parameters)
func send(ch chan<- int) {    // Send-only channel
    ch <- 42
}

func receive(ch <-chan int) { // Receive-only channel
    value := <-ch
    fmt.Println(value)
}
```

#### Unbuffered vs Buffered Channels

**Unbuffered Channels (Synchronous):**
```go
func main() {
    ch := make(chan string)
    
    go func() {
        ch <- "Hello" // Blocks until received
        fmt.Println("Sent Hello")
    }()
    
    message := <-ch // Blocks until sent
    fmt.Println("Received:", message)
}
```

**Buffered Channels (Asynchronous):**
```go
func main() {
    ch := make(chan string, 2)
    
    ch <- "Hello"    // Doesn't block (buffer has space)
    ch <- "World"    // Doesn't block (buffer has space)
    // ch <- "!"     // Would block (buffer full)
    
    fmt.Println(<-ch) // "Hello"
    fmt.Println(<-ch) // "World"
}
```

#### Select Statements
```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() {
        time.Sleep(time.Second)
        ch1 <- "Channel 1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "Channel 2"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received:", msg2)
        case <-time.After(3 * time.Second):
            fmt.Println("Timeout")
            return
        default:
            fmt.Println("No channels ready")
            time.Sleep(500 * time.Millisecond)
        }
    }
}
```

#### Channel Patterns

**Pipeline Pattern:**
```go
func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

// Usage
numbers := generate(2, 3, 4)
squares := square(numbers)
for result := range squares {
    fmt.Println(result)
}
```

### Day 12-13: Advanced Concurrency

#### Context Package
```go
// Context with timeout
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

// Context with cancellation
ctx, cancel := context.WithCancel(context.Background())

// Context with value
ctx = context.WithValue(ctx, "userID", 12345)

// Using context in functions
func doWork(ctx context.Context) error {
    select {
    case <-time.After(2 * time.Second):
        fmt.Println("Work completed")
        return nil
    case <-ctx.Done():
        fmt.Println("Work cancelled:", ctx.Err())
        return ctx.Err()
    }
}
```

#### Worker Pool Pattern
```go
type Job struct {
    ID int
    Data string
}

type Result struct {
    JobID int
    Output string
}

func worker(id int, jobs <-chan Job, results chan<- Result) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job.ID)
        time.Sleep(time.Second) // Simulate work
        results <- Result{
            JobID: job.ID,
            Output: fmt.Sprintf("Processed: %s", job.Data),
        }
    }
}

func main() {
    jobs := make(chan Job, 100)
    results := make(chan Result, 100)
    
    // Start workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send jobs
    for j := 1; j <= 9; j++ {
        jobs <- Job{ID: j, Data: fmt.Sprintf("data-%d", j)}
    }
    close(jobs)
    
    // Collect results
    for r := 1; r <= 9; r++ {
        result := <-results
        fmt.Printf("Result: %+v\n", result)
    }
}
```

#### Fan-in/Fan-out Patterns
```go
// Fan-out: Distribute work
func fanOut(in <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        ch := make(chan int)
        channels[i] = ch
        go func(out chan<- int) {
            defer close(out)
            for n := range in {
                out <- n * n // Process work
            }
        }(ch)
    }
    return channels
}

// Fan-in: Merge results
func fanIn(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    
    wg.Add(len(channels))
    for _, ch := range channels {
        go func(c <-chan int) {
            defer wg.Done()
            for n := range c {
                out <- n
            }
        }(ch)
    }
    
    go func() {
        wg.Wait()
        close(out)
    }()
    
    return out
}
```

#### sync.Once and sync.Pool
```go
// sync.Once - Execute only once
var once sync.Once
var instance *Singleton

func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{}
    })
    return instance
}

// sync.Pool - Object pooling
var pool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 1024)
    },
}

func processData() {
    buffer := pool.Get().([]byte)
    defer pool.Put(buffer)
    
    // Use buffer for processing
}
```

## Week 3: Error Handling, Testing & Performance

### Day 15-16: Error Handling & Best Practices

#### Go Error Philosophy
Go treats errors as values, not exceptions:

```go
// Basic error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Usage
result, err := divide(10, 0)
if err != nil {
    log.Fatal(err)
}
fmt.Println(result)
```

#### Custom Errors
```go
// Custom error type
type ValidationError struct {
    Field string
    Value interface{}
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed for field '%s' with value '%v': %s", 
        e.Field, e.Value, e.Message)
}

// Using custom errors
func validateAge(age int) error {
    if age < 0 {
        return &ValidationError{
            Field: "age",
            Value: age,
            Message: "age cannot be negative",
        }
    }
    if age > 150 {
        return &ValidationError{
            Field: "age", 
            Value: age,
            Message: "age seems unrealistic",
        }
    }
    return nil
}
```

#### Error Wrapping (Go 1.13+)
```go
func readConfig(filename string) (*Config, error) {
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, fmt.Errorf("failed to read config file: %w", err)
    }
    
    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }
    
    return &config, nil
}

// Error checking
config, err := readConfig("app.json")
if err != nil {
    if errors.Is(err, os.ErrNotExist) {
        // Handle file not found
    }
    
    var validationErr *ValidationError
    if errors.As(err, &validationErr) {
        // Handle validation error
    }
}
```

#### Panic and Recover
```go
func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()
    
    if b == 0 {
        panic("division by zero")
    }
    
    return a / b, nil
}
```

### Day 17-18: Testing & Benchmarking

#### Unit Testing
```go
// math.go
func Add(a, b int) int {
    return a + b
}

func Divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// math_test.go
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; want %d", result, expected)
    }
}

func TestDivide(t *testing.T) {
    // Test successful division
    result, err := Divide(10, 2)
    if err != nil {
        t.Errorf("Divide(10, 2) returned error: %v", err)
    }
    if result != 5 {
        t.Errorf("Divide(10, 2) = %d; want 5", result)
    }
    
    // Test division by zero
    _, err = Divide(10, 0)
    if err == nil {
        t.Error("Divide(10, 0) should return error")
    }
}
```

#### Table-Driven Tests
```go
func TestAddTable(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -2, -3, -5},
        {"zero", 0, 5, 5},
        {"negative result", 2, -3, -1},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d", 
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
```

#### Benchmarking
```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}

func BenchmarkStringConcat(b *testing.B) {
    b.Run("plus", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = "hello" + "world"
        }
    })
    
    b.Run("sprintf", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            _ = fmt.Sprintf("%s%s", "hello", "world")
        }
    })
    
    b.Run("builder", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var builder strings.Builder
            builder.WriteString("hello")
            builder.WriteString("world")
            _ = builder.String()
        }
    })
}
```

#### Test Coverage and Race Detection
```bash
# Run tests with coverage
go test -cover ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Run tests with race detector
go test -race ./...
```

#### Mocking and Dependency Injection
```go
// Define interface
type UserRepository interface {
    GetUser(id int) (*User, error)
    SaveUser(*User) error
}

// Service using the interface
type UserService struct {
    repo UserRepository
}

func (s *UserService) UpdateUserEmail(id int, email string) error {
    user, err := s.repo.GetUser(id)
    if err != nil {
        return err
    }
    
    user.Email = email
    return s.repo.SaveUser(user)
}

// Mock implementation for testing
type MockUserRepository struct {
    users map[int]*User
    err   error
}

func (m *MockUserRepository) GetUser(id int) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    user, exists := m.users[id]
    if !exists {
        return nil, errors.New("user not found")
    }
    return user, nil
}

func (m *MockUserRepository) SaveUser(user *User) error {
    if m.err != nil {
        return m.err
    }
    m.users[user.ID] = user
    return nil
}

// Test using mock
func TestUserService_UpdateUserEmail(t *testing.T) {
    mockRepo := &MockUserRepository{
        users: map[int]*User{
            1: {ID: 1, Email: "old@example.com"},
        },
    }
    
    service := &UserService{repo: mockRepo}
    
    err := service.UpdateUserEmail(1, "new@example.com")
    if err != nil {
        t.Errorf("UpdateUserEmail failed: %v", err)
    }
    
    user, _ := mockRepo.GetUser(1)
    if user.Email != "new@example.com" {
        t.Errorf("Email not updated. Got %s, want new@example.com", user.Email)
    }
}
```

### Day 19-20: Performance & Optimization

#### Memory Management and GC
```go
// Understanding allocations
func inefficientString() string {
    var result string
    for i := 0; i < 1000; i++ {
        result += fmt.Sprintf("item %d ", i) // Creates many allocations
    }
    return result
}

func efficientString() string {
    var builder strings.Builder
    for i := 0; i < 1000; i++ {
        fmt.Fprintf(&builder, "item %d ", i) // Fewer allocations
    }
    return builder.String()
}

// Escape analysis example
func returnsPointer() *int {
    x := 42
    return &x // x escapes to heap
}

func usesPointer() {
    x := 42
    fmt.Println(&x) // x might stay on stack
}
```

#### Profiling
```go
// CPU profiling
import _ "net/http/pprof"

func main() {
    go func() {
        log.Println(http.ListenAndServe("localhost:6060", nil))
    }()
    
    // Your application code
}

// Memory profiling in tests
func BenchmarkAllocations(b *testing.B) {
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        inefficientString()
    }
}
```

#### Performance Best Practices
```go
// Slice capacity management
func efficientSliceGrowth(size int) []int {
    // Pre-allocate with known capacity
    slice := make([]int, 0, size)
    for i := 0; i < size; i++ {
        slice = append(slice, i)
    }
    return slice
}

// String vs []byte
func processStrings(data []string) []byte {
    var buffer bytes.Buffer
    for _, s := range data {
        buffer.WriteString(s) // More efficient than string concatenation
    }
    return buffer.Bytes()
}

// Avoid unnecessary allocations
func countWords(text string) map[string]int {
    counts := make(map[string]int, 100) // Pre-size map if possible
    
    // Use strings.Fields instead of regexp for simple splitting
    words := strings.Fields(text)
    for _, word := range words {
        counts[strings.ToLower(word)]++
    }
    return counts
}
```

### Day 21: Web Development Basics

#### HTTP Server Fundamentals
```go
func main() {
    // Basic handler
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })
    
    // Handler with method checking
    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case http.MethodGet:
            // Handle GET request
            users := []string{"Alice", "Bob", "Charlie"}
            json.NewEncoder(w).Encode(users)
        case http.MethodPost:
            // Handle POST request
            var user map[string]string
            if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
                http.Error(w, "Invalid JSON", http.StatusBadRequest)
                return
            }
            // Process user creation
            w.WriteHeader(http.StatusCreated)
            json.NewEncoder(w).Encode(user)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })
    
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

#### Custom HTTP Handlers
```go
type UserHandler struct {
    users map[int]User
    mu    sync.RWMutex
}

func (h *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        h.getUsers(w, r)
    case http.MethodPost:
        h.createUser(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func (h *UserHandler) getUsers(w http.ResponseWriter, r *http.Request) {
    h.mu.RLock()
    defer h.mu.RUnlock()
    
    users := make([]User, 0, len(h.users))
    for _, user := range h.users {
        users = append(users, user)
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}
```

#### Middleware Pattern
```go
type Middleware func(http.Handler) http.Handler

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        // Validate token
        next.ServeHTTP(w, r)
    })
}

// Chain middlewares
func chainMiddleware(h http.Handler, middlewares ...Middleware) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

// Usage
handler := &UserHandler{users: make(map[int]User)}
http.Handle("/users", chainMiddleware(handler, loggingMiddleware, authMiddleware))
```

## Week 4: System Design, Interview Practice & Final Review

### Day 22-24: Advanced Topics & System Design

#### Go Modules and Dependency Management
```go
// go.mod file
module github.com/username/myproject

go 1.21

require (
    github.com/gorilla/mux v1.8.0
    github.com/lib/pq v1.10.7
)

require (
    github.com/gorilla/handlers v1.5.1 // indirect
)

// Version constraints
require github.com/gin-gonic/gin v1.9.0  // Exact version
require github.com/gin-gonic/gin ^1.9.0  // Compatible version
require github.com/gin-gonic/gin ~1.9.0  // Patch level changes
```

**Module Commands:**
```bash
go mod init mymodule          # Initialize module
go mod tidy                   # Clean up dependencies
go mod download               # Download dependencies
go mod vendor                 # Create vendor directory
go get github.com/pkg/errors  # Add dependency
go get -u ./...              # Update all dependencies
```

#### Build Tags and Conditional Compilation
```go
// file_dev.go
//go:build dev
// +build dev

package config

const DatabaseURL = "localhost:5432/myapp_dev"

// file_prod.go
//go:build prod
// +build prod

package config

const DatabaseURL = "prod-db:5432/myapp"

// file_test.go
//go:build test
// +build test

package config

const DatabaseURL = "localhost:5432/myapp_test"
```

Build with tags:
```bash
go build -tags dev
go build -tags prod
go test -tags test
```

#### Reflection Basics
```go
import "reflect"

func inspectValue(v interface{}) {
    rv := reflect.ValueOf(v)
    rt := reflect.TypeOf(v)
    
    fmt.Printf("Type: %s, Kind: %s\n", rt.Name(), rv.Kind())
    
    // Handle different kinds
    switch rv.Kind() {
    case reflect.Struct:
        for i := 0; i < rv.NumField(); i++ {
            field := rt.Field(i)
            value := rv.Field(i)
            fmt.Printf("Field %s: %v\n", field.Name, value.Interface())
        }
    case reflect.Slice:
        for i := 0; i < rv.Len(); i++ {
            fmt.Printf("Element %d: %v\n", i, rv.Index(i).Interface())
        }
    }
}

// JSON-like marshaling with reflection
func marshalStruct(v interface{}) map[string]interface{} {
    rv := reflect.ValueOf(v)
    rt := reflect.TypeOf(v)
    
    if rv.Kind() != reflect.Struct {
        return nil
    }
    
    result := make(map[string]interface{})
    for i := 0; i < rv.NumField(); i++ {
        field := rt.Field(i)
        if field.IsExported() { // Only exported fields
            result[field.Name] = rv.Field(i).Interface()
        }
    }
    return result
}
```

**When to Use/Avoid Reflection:**
- Use: Generic libraries, serialization, ORMs
- Avoid: Performance-critical code, when type safety is important
- Alternative: Code generation for better performance

#### System Design with Go

**Microservices Architecture:**
```go
// Service discovery interface
type ServiceRegistry interface {
    Register(service *ServiceInfo) error
    Discover(serviceName string) ([]*ServiceInfo, error)
    Deregister(serviceID string) error
}

type ServiceInfo struct {
    ID       string
    Name     string
    Host     string
    Port     int
    Metadata map[string]string
}

// Circuit breaker pattern
type CircuitBreaker struct {
    maxFailures  int
    timeout      time.Duration
    failures     int
    lastFailTime time.Time
    state        CircuitState
    mu           sync.RWMutex
}

type CircuitState int

const (
    Closed CircuitState = iota
    Open
    HalfOpen
)

func (cb *CircuitBreaker) Call(fn func() error) error {
    cb.mu.Lock()
    defer cb.mu.Unlock()
    
    if cb.state == Open {
        if time.Since(cb.lastFailTime) > cb.timeout {
            cb.state = HalfOpen
        } else {
            return errors.New("circuit breaker is open")
        }
    }
    
    err := fn()
    if err != nil {
        cb.failures++
        cb.lastFailTime = time.Now()
        if cb.failures >= cb.maxFailures {
            cb.state = Open
        }
        return err
    }
    
    // Success - reset circuit breaker
    cb.failures = 0
    cb.state = Closed
    return nil
}
```

**Load Balancer Implementation:**
```go
type LoadBalancer interface {
    NextServer() *Server
    AddServer(*Server)
    RemoveServer(serverID string)
}

// Round-robin load balancer
type RoundRobinLB struct {
    servers []*Server
    current int
    mu      sync.Mutex
}

func (lb *RoundRobinLB) NextServer() *Server {
    lb.mu.Lock()
    defer lb.mu.Unlock()
    
    if len(lb.servers) == 0 {
        return nil
    }
    
    server := lb.servers[lb.current]
    lb.current = (lb.current + 1) % len(lb.servers)
    return server
}

// Weighted round-robin
type WeightedServer struct {
    *Server
    Weight         int
    CurrentWeight  int
}

type WeightedRoundRobinLB struct {
    servers []*WeightedServer
    mu      sync.Mutex
}

func (lb *WeightedRoundRobinLB) NextServer() *Server {
    lb.mu.Lock()
    defer lb.mu.Unlock()
    
    if len(lb.servers) == 0 {
        return nil
    }
    
    totalWeight := 0
    var selected *WeightedServer
    
    for _, server := range lb.servers {
        server.CurrentWeight += server.Weight
        totalWeight += server.Weight
        
        if selected == nil || server.CurrentWeight > selected.CurrentWeight {
            selected = server
        }
    }
    
    selected.CurrentWeight -= totalWeight
    return selected.Server
}
```

#### Database Integration Patterns
```go
// Repository pattern
type UserRepository interface {
    Create(user *User) error
    GetByID(id int) (*User, error)
    Update(user *User) error
    Delete(id int) error
    List(limit, offset int) ([]*User, error)
}

type PostgresUserRepository struct {
    db *sql.DB
}

func (r *PostgresUserRepository) Create(user *User) error {
    query := `INSERT INTO users (name, email, created_at) VALUES ($1, $2, $3) RETURNING id`
    err := r.db.QueryRow(query, user.Name, user.Email, time.Now()).Scan(&user.ID)
    return err
}

func (r *PostgresUserRepository) GetByID(id int) (*User, error) {
    user := &User{}
    query := `SELECT id, name, email, created_at FROM users WHERE id = $1`
    err := r.db.QueryRow(query, id).Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt)
    if err == sql.ErrNoRows {
        return nil, ErrUserNotFound
    }
    return user, err
}

// Transaction management
func (r *PostgresUserRepository) TransferMoney(fromID, toID int, amount decimal.Decimal) error {
    tx, err := r.db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()
    
    // Debit from source account
    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, fromID)
    if err != nil {
        return err
    }
    
    // Credit to destination account
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, toID)
    if err != nil {
        return err
    }
    
    return tx.Commit()
}
```

### Day 25-27: Mock Interviews & Coding Practice

#### Common Go Interview Questions with Detailed Answers

**1. "Explain the difference between arrays and slices in Go."**

Answer Structure:
- Definition and syntax differences
- Memory layout and performance implications
- Use cases for each
- Code examples

**2. "How does Go's garbage collector work?"**

Answer Points:
- Concurrent, tri-color mark-and-sweep collector
- Low-latency design
- How it affects application performance
- Tuning GC with GOGC environment variable

**3. "Explain Go's interface system and why it's different."**

Answer Structure:
- Implicit satisfaction vs explicit implementation
- Interface values (type and value)
- Empty interface and type assertions
- Why it enables better composition

**4. "What are goroutines and how do they differ from threads?"**

Answer Points:
- Lightweight threading model
- Go scheduler (M:N model)
- Stack management (segmented stacks)
- Performance characteristics

#### System Design Questions

**"Design a URL shortener like bit.ly using Go"**

Key Components to Discuss:
```go
// Core service structure
type URLShortener struct {
    storage   Storage
    cache     Cache
    generator IDGenerator
    stats     StatsCollector
}

// Storage interface for different backends
type Storage interface {
    Store(shortID string, originalURL string, expiry time.Time) error
    Retrieve(shortID string) (string, error)
    Delete(shortID string) error
}

// Caching layer
type Cache interface {
    Get(key string) (string, bool)
    Set(key string, value string, ttl time.Duration) error
    Delete(key string) error
}

// ID generation strategies
type IDGenerator interface {
    Generate() string
}

// Base62 encoder for short IDs
type Base62Generator struct {
    counter int64
}

func (g *Base62Generator) Generate() string {
    id := atomic.AddInt64(&g.counter, 1)
    return encodeBase62(id)
}
```

**Architecture Considerations:**
- Horizontal scaling with consistent hashing
- Database sharding strategies
- Caching layers (Redis/Memcached)
- Rate limiting and abuse prevention
- Analytics and monitoring

#### Coding Problem Patterns

**Concurrency Problems:**
```go
// Producer-consumer with bounded buffer
func ProducerConsumer(bufferSize int) {
    buffer := make(chan int, bufferSize)
    var wg sync.WaitGroup
    
    // Producer
    wg.Add(1)
    go func() {
        defer wg.Done()
        defer close(buffer)
        for i := 0; i < 10; i++ {
            buffer <- i
            fmt.Printf("Produced: %d\n", i)
        }
    }()
    
    // Consumer
    wg.Add(1)
    go func() {
        defer wg.Done()
        for item := range buffer {
            fmt.Printf("Consumed: %d\n", item)
            time.Sleep(100 * time.Millisecond)
        }
    }()
    
    wg.Wait()
}

// Rate limiter implementation
type RateLimiter struct {
    tokens chan struct{}
    ticker *time.Ticker
    done   chan struct{}
}

func NewRateLimiter(rate int, burst int) *RateLimiter {
    rl := &RateLimiter{
        tokens: make(chan struct{}, burst),
        ticker: time.NewTicker(time.Second / time.Duration(rate)),
        done:   make(chan struct{}),
    }
    
    // Fill initial burst
    for i := 0; i < burst; i++ {
        rl.tokens <- struct{}{}
    }
    
    go rl.run()
    return rl
}

func (rl *RateLimiter) run() {
    for {
        select {
        case <-rl.ticker.C:
            select {
            case rl.tokens <- struct{}{}:
            default: // Bucket full
            }
        case <-rl.done:
            rl.ticker.Stop()
            return
        }
    }
}

func (rl *RateLimiter) Allow() bool {
    select {
    case <-rl.tokens:
        return true
    default:
        return false
    }
}
```

### Day 28-29: Final Review & Weak Areas

#### Go Memory Model Key Points
```go
// Happens-before relationships
var a string
var done bool

func setup() {
    a = "hello, world"  // Write to a
    done = true         // Write to done
}

func main() {
    go setup()
    for !done {         // Read from done
        // busy wait
    }
    print(a)           // Read from a - guaranteed to see "hello, world"
}

// Channel synchronization
var c = make(chan int, 10)
var a string

func f() {
    a = "hello, world"
    c <- 0
}

func main() {
    go f()
    <-c
    print(a) // Guaranteed to print "hello, world"
}
```

#### Performance Optimization Checklist
```go
// Efficient string building
func BuildString(parts []string) string {
    var builder strings.Builder
    builder.Grow(estimateSize(parts)) // Pre-allocate capacity
    for _, part := range parts {
        builder.WriteString(part)
    }
    return builder.String()
}

// Slice pre-allocation
func ProcessItems(items []Item) []Result {
    results := make([]Result, 0, len(items)) // Pre-allocate capacity
    for _, item := range items {
        if result := process(item); result.IsValid() {
            results = append(results, result)
        }
    }
    return results
}

// Map pre-sizing
func CountWords(text string) map[string]int {
    words := strings.Fields(text)
    counts := make(map[string]int, len(words)/2) // Estimate capacity
    for _, word := range words {
        counts[word]++
    }
    return counts
}

// Avoiding allocations in hot paths
func FastPath(data []byte) bool {
    // Use byte operations instead of string conversions
    return bytes.HasPrefix(data, []byte("prefix"))
}
```

#### Common Gotchas and Best Practices
```go
// Goroutine leaks
func BadExample() {
    ch := make(chan int)
    go func() {
        ch <- 42 // This goroutine will leak if nobody reads from ch
    }()
    // Channel never read from - goroutine leaks
}

func GoodExample() {
    ch := make(chan int, 1) // Buffered channel prevents leak
    go func() {
        ch <- 42
    }()
    // Or ensure someone reads from the channel
}

// Loop variable capture
func BadLoopExample() {
    for i := 0; i < 3; i++ {
        go func() {
            fmt.Println(i) // Prints 3, 3, 3 (or unpredictable)
        }()
    }
}

func GoodLoopExample() {
    for i := 0; i < 3; i++ {
        go func(val int) {
            fmt.Println(val) // Prints 0, 1, 2 (in some order)
        }(i)
    }
}

// Slice modification during iteration
func BadSliceExample(slice []int) {
    for i, v := range slice {
        if v == 0 {
            slice = append(slice[:i], slice[i+1:]...) // Dangerous!
        }
    }
}

func GoodSliceExample(slice []int) []int {
    var result []int
    for _, v := range slice {
        if v != 0 {
            result = append(result, v)
        }
    }
    return result
}
```

### Day 30: Final Preparation

#### Quick Reference - Core Concepts

**Data Types:**
- Basic types: int, float64, string, bool
- Composite types: array, slice, map, struct, pointer, function, interface, channel
- Zero values: 0, "", false, nil

**Control Flow:**
- if/else, for (only loop), switch, select
- defer, panic, recover

**Concurrency:**
- goroutines: `go func()`
- channels: `make(chan Type, capacity)`
- select: non-blocking channel operations
- sync package: Mutex, WaitGroup, Once

**Interfaces:**
- Implicit satisfaction
- Empty interface: `interface{}`
- Type assertions: `value.(Type)`

**Error Handling:**
- Errors as values
- Multiple return values: `value, err`
- Error wrapping: `fmt.Errorf("...: %w", err)`

#### Last-Minute Interview Tips

**Technical Communication:**
1. Think out loud - explain your reasoning
2. Start with brute force, then optimize
3. Consider edge cases and error conditions
4. Discuss trade-offs between solutions

**Go-Specific Points to Mention:**
1. Why Go? Performance, simplicity, concurrency
2. Goroutines vs threads - lightweight, managed by runtime
3. Interfaces enable composition over inheritance
4. Garbage collected but performance-oriented
5. Strong ecosystem and tooling

**Questions to Ask Interviewer:**
1. How does your team use Go's concurrency features?
2. What Go libraries/frameworks do you use?
3. How do you handle microservices communication?
4. What's your testing and deployment strategy?
5. How do you monitor Go applications in production?

#### Final Confidence Boosters

Remember these Go strengths:
- Simple syntax with powerful features
- Excellent concurrency primitives
- Fast compilation and execution
- Strong standard library
- Great tooling (go fmt, go test, go mod)
- Used by major companies (Google, Uber, Docker, Kubernetes)

You've covered all the essential topics. Trust your preparation and focus on clear communication during the interview. Good luck!