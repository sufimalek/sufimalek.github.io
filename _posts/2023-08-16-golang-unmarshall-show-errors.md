---
layout: post
title:  "Go Lang Unmarshall show errors"
date:   2023-08-16 13:09:01
categories: 
    - Development
    - Golang
tags: 
    - featured
    - golang
    - go-error-handling
# image: /assets/img/symfony_logo.png
excerpt: When you are Unmarshalling JSON in GO, you would probably get some error at some time regarding JSON format, fields or value types etc,..
keywords: golang
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

<!-- <h1 class="mt-5">JSON Unmarshall erros</h1> -->

When you are Unmarshalling JSON in GO, you would probably get some error at some time regarding JSON format, fields or value types etc,.

So, most of us using simple syntax of the error to handle the error like in below example,

![Alt](/assets/images/posts/17082023_1.png){: .light .w-75 .shadow .rounded-10 w='1212' h='668' }

```golang
package main

import (
	"encoding/json"
	"fmt"
)

type A struct {
	Name  string
	Email string
}

func main() {
	var a A
	bs := []byte(`{"Name":"hello","Email":123}`)
	if e := json.Unmarshal(bs, &a); e != nil {
		fmt.Println("Other error:", e)
	}
}

```

Sometime this will not provide exact error what we want so, we can take a correct action on it.


>  The error message should be specific enough to let the caller know what went wrong, and it should provide enough information for the caller to take corrective action.

For example, the error message **"This is a value error"** is not very informative. It does not tell the caller what the value was, or why it was invalid. A better error message would be **"The value 'abc' is not a valid number."** This error message tells the caller that the value is invalid, and it also provides some information about why it is invalid.

In some cases, the caller may need more information than just an error message. For example, if the error is caused by a bug in the code, the caller may need to know the line number of the bug. Or, if the error is caused by a problem with the data, the caller may need to know the source of the data.

> The error interface should be designed to be flexible enough to accommodate different types of errors and different levels of detail. The caller should be able to get the information they need to troubleshoot the error, without being overwhelmed by unnecessary detail.
{: .prompt-info }

Below is the sample of how to implement error :

```golang
package main

import (
	"encoding/json"
	"fmt"
)

type A struct {
	Name  string
	Email string
}

func main() {
	var a A
	bs := []byte(`{"Name":"hello","Email":123}`)
	if err := json.Unmarshal(bs, &a); err != nil {
		switch e := err.(type) {
		case *json.UnmarshalTypeError:
			fmt.Printf("UnmarshalTypeError: Value[%s] Type[%v]\n", e.Value, e.Type)
		case *json.InvalidUnmarshalError:
			fmt.Printf("InvalidUnmarshalError: Type[%v]\n", e.Type)
		default:
			fmt.Println(err)
		}
	}
}
```




> you can find all supported error types doc [**Here**](https://pkg.go.dev/encoding/json#UnmarshalFieldError)
{: .prompt-info }