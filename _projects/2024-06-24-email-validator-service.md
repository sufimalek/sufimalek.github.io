---

layout: post
title:  "Email Validator Service"
author: 
project_link: https://github.com/sufimalek/email-validator-service
pin: true
tags: [projects]
image: 
description: The Email Validator Service is a comprehensive and production-ready service built in Go, designed to validate email addresses through various checks. It supports multiple validation mechanisms including syntax validation, role-based email checks, MX records verification, SMTP validation, and more.
keywords: email, validator, service
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

Email Validator Service [Project]

Github link: [Git]

***

![Alt](/assets/images/projects/email-validation.jpg)  

## Usage

### API Endpoints

#### Validate Email

- **URL**: `/api/validate`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "example@example.com"
  }
  ```
- **Response** (Valid Email):
  ```json
  {
    "is_valid": true,
  }
  ```
- **Response** (Invalid Email):
  ```json
  {
    "is_valid": false,
    "message": "Email validation failed"
  }
  ```

### Sample Request

You can use `curl` to make a request to the API:

```sh
curl -X POST https://emailvalidator.ne.choreoapps.dev/api/validate -H "Content-Type: application/json" -d '{"email": "test@example.com"}'
```

### Response

```json
{
  "is_valid": true,
}
```


***
This project is simple hobby project.

[Project]: https://github.com/sufimalek/email-validator-service
[Git]: https://github.com/sufimalek/email-validator-service