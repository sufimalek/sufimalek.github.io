---
layout: post
title: "Go Applications using Docker with Multi-Stage Builds"
excerpt: "Multi-stage builds allow Docker to create optimized images by separating different phases of the build process into multiple steps (or stages). This method reduces the size of the final image and improves security by only including the necessary runtime components."
author: 
date: 2024-09-15
categories: [go, docker, multi-stage]
tags: [go]
pin: true
keywords: [go, server, docker]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

<!-- ![Alt](/assets/images/posts/franken_php.png) -->

# Optimizing Go Applications using Docker with Multi-Stage Builds

### **What is Multi-Stage Docker Build?**

Multi-stage builds allow Docker to create optimized images by separating different phases of the build process into multiple steps (or stages). This method reduces the size of the final image and improves security by only including the necessary runtime components.

For a Go application, this means using a **stage for compiling the source code** and **another stage for creating a minimal final image with only the compiled binary and necessary dependencies**. The intermediate artifacts used for building (such as Go compilers, libraries, or unnecessary files) are excluded from the final image, making it lightweight.

### **Why Use Multi-Stage Builds?**

- **Smaller Image Size:** By using multi-stage builds, the final image is much smaller since only the compiled Go binary and essential runtime dependencies are included.
  
- **Improved Security:** Reducing the image size also reduces the attack surface. You avoid shipping unnecessary tools like compilers or build tools in the final production image.

- **Faster Deployments:** Smaller images take less time to push to the Docker registry and pull to your servers, resulting in faster deployments.

### **Step-by-Step Example: Optimizing a Go Application with Multi-Stage Docker Build**

Let’s consider a simple Go application that needs optimization for Docker deployment using multi-stage builds.

#### **1. Basic Go Application**

```go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Optimized Go Application!")
}
```

#### **2. Dockerfile for Multi-Stage Build**

```dockerfile
# Stage 1: Build the Go application
FROM golang:1.18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -o optimized-app .

# Stage 2: Create a minimal runtime image
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the compiled binary from the previous stage
COPY --from=builder /app/optimized-app .

# Set the entrypoint to run the compiled binary
ENTRYPOINT ["./optimized-app"]
```

#### **3. Explanation of Dockerfile**

**Stage 1: Builder Stage**
- `FROM golang:1.18-alpine AS builder`: The first stage uses a Golang image based on Alpine Linux. It’s a lightweight image with everything needed to compile the Go application.
  
- `WORKDIR /app`: Set the working directory to `/app` inside the container.

- `COPY go.mod go.sum ./`: The Go module files are copied to the container to manage dependencies.

- `RUN go mod download`: This command downloads all the dependencies specified in `go.mod` and `go.sum`.

- `COPY . .`: The source code is copied into the container.

- `RUN CGO_ENABLED=0 GOOS=linux go build -o optimized-app`: The Go application is built for Linux with CGO disabled to make the binary more portable and to avoid needing the C library at runtime.

**Stage 2: Minimal Runtime Stage**
- `FROM alpine:latest`: The second stage uses a minimal Alpine Linux base image that will contain only the compiled Go binary.

- `WORKDIR /app`: Again, set the working directory to `/app` inside the runtime container.

- `COPY --from=builder /app/optimized-app .`: The compiled binary from the first stage (`builder`) is copied into this minimal image.

- `ENTRYPOINT ["./optimized-app"]`: Set the entry point of the container to the compiled Go binary.

#### **4. Building the Docker Image**

Now that we have a Dockerfile ready for a multi-stage build, you can build the image with the following command:

```bash
docker build -t optimized-go-app .
```

#### **5. Running the Container**

Once the build is complete, you can run the container with:

```bash
docker run --rm optimized-go-app
```

You should see the output:

```bash
Hello, Optimized Go Application!
```

#### **6. Verifying the Optimization**

Let’s compare the size of an image built without a multi-stage build versus one that uses it. Here’s an example of what you might see:

- **Without multi-stage builds**: 700 MB (includes Golang compiler, dependencies, and unnecessary build artifacts)
- **With multi-stage builds**: 10 MB (only the binary and essential runtime dependencies)

By using multi-stage builds, we’ve reduced the size of the image dramatically, making it quicker to deploy and more efficient.

---

### **Conclusion**

Optimizing Go applications using Docker with multi-stage builds is a powerful approach to reducing the image size, improving security, and speeding up deployments. By splitting the build and runtime environments, you only include what’s necessary in the final image, making it more efficient. This method is easy to implement and can significantly improve your Go application deployment pipeline.

Try implementing multi-stage builds in your own projects and see the benefits of smaller, faster, and more secure Docker images.


## Reference


* 1 [Docker : Multi-stage builds.](https://docs.docker.com/build/building/multi-stage/)

