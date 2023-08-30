---
layout: wiki
title: Network
cate1: Basis
cate2: Network
description: Network
keywords: Basis
---

## the term

**TCP**（Transmission Control Protocol）

Transmission Control Protocol, a connection-based service.

**UDP**（User Datagram Protocol）

User Datagram Protocol, a connectionless service.

**IP**（Internet Protocol）

Internet Protocol, Messaging Mechanism.

## TCP

> TCP is a streaming device, a virtual connection. From the establishment of the TCP connection to the normal end of the connection, all data should be regarded as a whole, which ensures that the whole sent by the sender is consistent with the whole received by the receiver. And until the TCP is disconnected, the receiving end does not know how much data is sent by the sending end, how to improve it, and how much data is left. Therefore, in applications, no assumptions should be made about how TCP delivers data.

### sliding window

![tcp sliding window](/images/wiki/tcp-sliding-window_1.jpeg)

### three way handshake

![three-way handshake](/images/wiki/three-way-handshake.png)

### four way times

![four-way handshake](/images/wiki/four-way-handshake.png)

## The difference between TCP and UDP

1. connection-based vs. connectionless

2. Demand on system resources (more TCP, less UDP)

    * TCP provides more complex control processes such as connection status, sending and receiving status, and timeout retransmission
    * TCP header 20 bytes more than UDP's 8 bytes

3. UDP program structure is relatively simple

    Because the flow is continuous and ordered, TCP needs to process the framing of data by itself, while UDP receives a data packet at a time and preserves the message boundary.

4. stream mode vs datagram mode

    * TCP guarantees data correctness, UDP may lose packets
    * TCP guarantees data order, UDP does not

5. TCP uses a sliding window protocol for flow control

6. The logical communication channel of TCP is a full-duplex reliable channel, and UDP is unreliable

7. TCP connections are point-to-point, while UDP runs one-to-one, one-to-many, many-to-one and many-to-many interactive communications

UDP is suitable for communication or broadcasting that requires high-speed transmission and high real-time requirements, and TCP is suitable for scenarios that emphasize data order and reliability.

## refer to
