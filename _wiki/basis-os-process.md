---
layout: wiki
title: Process
cate1: Basis
cate2:
description: Process
keywords: Basis
# comments: false
---

## User Space and Kernel Space

> On modern operating systems, physical memory is no longer visible to programs, that is, program instructions and their access data are in the virtual address space, and the machine maps them to real physical memory pages through a mechanism called MMU.

The process space is actually divided into two parts, one part is used by the process, called user space, and the other part is used by the kernel, called kernel space. User space is isolated between processes, and kernel space is shared.

> Specifically, on a 32-bit Windows system with 4GB of memory, the lower 2GB is the user space, and the upper 2GB is the kernel space, which means that the content of the upper 2GB space seen by each process is the same. The Linux system maps the high 1GB space to the kernel space, corresponding to the low 1GB physical memory. (There are 3GB/1GB, 2GB/2GB, 4GB/4GB and other modes, the above parameters are actually adjustable.)


> When the program is running in the user mode, in order to access the resources of the kernel, it must go through the interface provided by the kernel and interrupt through the system call (int 0x80 under Linux). If an interrupt occurs, the scene will be protected, and the control will be handed over to the kernel, which will call the corresponding function according to the interrupt number. After the end, the stack will be cleared, and pc will point to the original saved return address, returning to the user state.

## refer to

* [Kernel Space Definition](http://www.linfo.org/kernel_space.html)
<!-- * [user space/kernel space](http://bbs.csdn.net/topics/330137042) -->
<!-- * [Similarities and differences of Windows/Linux kernel address space management](http://blog.csdn.net/dog250/article/details/16356141) -->
