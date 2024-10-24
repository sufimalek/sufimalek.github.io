---
layout: post
title: "Optimizing Go deployment using Docker with scratch"
excerpt: "Using the scratch image in Docker is a great way to create a super minimal image for your Go applications. The scratch image is an empty base image, meaning it contains absolutely nothing, not even basic utilities like bash. It’s ideal for Go applications that are statically compiled and don’t require any external dependencies."
author: 
date: 2024-10-21
categories: [go, docker, multi-stage, scratch]
tags: [go, docker]
pin: true
keywords: [go, server, docker, scratch]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

<!-- ![Alt](/assets/images/posts/franken_php.png) -->

Using the `scratch` image in Docker is a great way to create a super minimal image for your Go applications. The `scratch` image is an empty base image, meaning it contains absolutely nothing, not even basic utilities like `bash`. It's ideal for Go applications that are statically compiled and don't require any external dependencies.

Here’s a detailed example of how to use `scratch` with a Go application and a multi-stage build.

### **1. Go Application with Scratch**

```go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, from a Go app in a Scratch container!")
}
```

### **Dockerfile with Scratch**

```dockerfile
# Stage 1: Build the Go application
FROM golang:1.18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Go module files and download dependencies (if any)
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN go build -o optimized-app .

# Stage 2: Create a minimal image using scratch
FROM scratch

# Set the working directory
WORKDIR /app

# Copy the statically compiled binary from the builder stage
COPY --from=builder /app/optimized-app .

# Command to run the application
ENTRYPOINT ["./optimized-app"]
```

### **Explanation of the Dockerfile**

- **Stage 1 (Builder Stage):**
  - `FROM golang:1.18-alpine AS builder`: This uses the Go Alpine image to build the application.
  - `RUN go build -o optimized-app`: This builds the Go application as a static binary (no CGO) for Linux.

- **Stage 2 (Final Stage using Scratch):**
  - `FROM scratch`: The `scratch` image is an empty base image.
  - `COPY --from=builder /app/optimized-app .`: We copy the compiled Go binary from the `builder` stage.
  - `ENTRYPOINT ["./optimized-app"]`: This sets the entry point to execute the Go binary.

### **Building and Running the Docker Container**

1. **Build the Docker Image:**

   ```bash
   docker build -t go-app-scratch .
   ```

2. **Run the Docker Container:**

   ```bash
   docker run --rm go-app-scratch
   ```

   The output will be:

   ```bash
   Hello, from a Go app in a Scratch container!
   ```

### **Benefits of Using Scratch**
- **Minimal Image Size:** The final image will only contain your Go binary and no unnecessary files. The size could be as small as a few megabytes.
- **Security:** Since the image contains nothing except your binary, there's a very small attack surface.
- **Portability:** The static Go binary ensures that your app doesn’t depend on system libraries, making it extremely portable.

### **Verifying Image Size**

You can check the size of the Docker image by running:

```bash
docker images go-app-scratch
```

You will notice that the image size is significantly smaller compared to traditional Docker images that use larger base images like `alpine` or `ubuntu`.

---

### **Comparison of Image Sizes**

1. **Without Multi-Stage Build (using Golang as base):**
   - Image size: ~800MB (contains Golang compiler, unnecessary tools)

2. **With Multi-Stage Build (using Alpine for runtime):**
   - Image size: ~10-15MB (includes only minimal Alpine runtime)

3. **With Multi-Stage Build (using Scratch):**
   - Image size: ~5-10MB (only the Go binary is included, no OS)

---

### **Conclusion**

Using the `scratch` base image with multi-stage builds allows you to create extremely minimal, secure, and efficient Docker containers. It’s perfect for statically compiled Go applications where you don’t need any external runtime dependencies. By following this approach, you ensure that your containers are lightweight, fast to deploy, and have a minimal attack surface.


## Reference


* 1 [Docker : Multi-stage builds.](https://docs.docker.com/build/building/multi-stage/)

