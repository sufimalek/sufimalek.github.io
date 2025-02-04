---
layout: post
title: "Kafka Consumer Groups"
excerpt: "Consumer Groups, which is a key concept in Kafka for managing how messages are consumed from topics."
author: 
date: 2025-02-04
categories: [golang, kafka]
tags: [kafka, golang]
pin: true
keywords: [kafka, golang]
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

The `GroupID` in Kafka is used to define a **consumer group**, which is a key concept in Kafka for managing how messages are consumed from topics.
Here's a detailed explanation of what GroupID: "fraud-detector" means in the context of below application code:
---


```go
package main

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/segmentio/kafka-go"
)

type Transaction struct {
	TransactionID string  `json:"transaction_id"`
	UserID        string  `json:"user_id"`
	Amount        float64 `json:"amount"`
	Location      string  `json:"location"`
	Timestamp     string  `json:"timestamp"`
}

func main() {
	// Initialize Kafka reader (consumer)
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{"localhost:9092"},
		Topic:     "transactions",
		GroupID:   "fraud-detector",
		MinBytes:  10e3, // 10KB
		MaxBytes:  10e6, // 10MB
	})
	defer reader.Close()

	// Initialize Kafka writer for fraud alerts
	alertWriter := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{"localhost:9092"},
		Topic:   "fraud-alerts",
		Balancer: &kafka.LeastBytes{},
	})
	defer alertWriter.Close()

	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatalf("Failed to read message: %v", err)
		}

		var transaction Transaction
		err = json.Unmarshal(m.Value, &transaction)
		if err != nil {
			log.Printf("Failed to unmarshal transaction: %v", err)
			continue
		}

		log.Printf("Consumed transaction: %+v", transaction)

		// Simple fraud detection rule: flag transactions over $900
		if transaction.Amount > 900 {
			log.Printf("Fraud detected: %+v", transaction)
			alertData, err := json.Marshal(transaction)
			if err != nil {
				log.Printf("Failed to marshal fraud alert: %v", err)
				continue
			}

			err = alertWriter.WriteMessages(context.Background(),
				kafka.Message{
					Key:   []byte(transaction.TransactionID),
					Value: alertData,
				})
			if err != nil {
				log.Printf("Failed to write fraud alert: %v", err)
			} else {
				log.Printf("Fraud alert produced for transaction ID: %s", transaction.TransactionID)
			}
		}
	}
}

```

### **What is `GroupID`?**
1. **Consumer Group:** 
   - A group of consumers that work together to consume messages from a Kafka topic.
   - Each consumer in the group is assigned one or more partitions of the topic, ensuring that every message is processed by only one consumer in the group.

2. **GroupID:**
   - The `GroupID` is a unique identifier for a consumer group.
   - Consumers with the same `GroupID` share the work of processing messages from the topic.

---

### **Role of `GroupID: "fraud-detector"`**
In this example:
- The `fraud-detector` is the identifier for the consumer group responsible for processing transactions from the `transactions` topic.
- All consumers that use the `GroupID: "fraud-detector"` belong to the same group.

---

### **How it Works:**
1. **Single Consumer Group with One Consumer:**
   - If there is only one consumer with `GroupID: "fraud-detector"`, it will read all partitions of the topic.

2. **Single Consumer Group with Multiple Consumers:**
   - If multiple consumers are started with the same `GroupID`, Kafka will assign partitions of the `transactions` topic to each consumer in the group.
   - This ensures parallel processing of messages, where each message is processed only once.

3. **Multiple Consumer Groups:**
   - If another consumer group (e.g., `GroupID: "another-detector"`) reads from the same topic, both consumer groups will receive all the messages independently.

---

### **Benefits of `GroupID`:**
- **Parallelism:** Allows multiple consumers to process data in parallel by dividing topic partitions among them.
- **Scalability:** Adding more consumers to a group increases the capacity to process messages.
- **Fault Tolerance:** If one consumer in the group fails, the partitions assigned to it will be rebalanced among the remaining consumers in the group.

---

### **Example Scenario:**
- If the `transactions` topic has 3 partitions:
  - **1 consumer in `GroupID: "fraud-detector"`:** The single consumer will consume all 3 partitions.
  - **3 consumers in `GroupID: "fraud-detector"`:** Each consumer will consume one partition.
  - **1 consumer in `GroupID: "fraud-detector"` and another in `GroupID: "audit-logger"`:** Both consumers (in different groups) will receive all the messages independently.

---

In your example, `GroupID: "fraud-detector"` ensures that all consumers in this group collaborate to process transactions for fraud detection. If you scale up and add more consumers to this group, Kafka will distribute the partitions among them for load balancing.

### **Conclusion**

Keep Coding! 😊

## Reference
