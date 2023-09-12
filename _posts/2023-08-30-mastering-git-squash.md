---
layout: post
title: "Mastering Git Squash: Streamlining Your Commit History"
excerpt: Git is a powerful and popular version control system that allows you to track changes in your code and collaborate with other developers. However, sometimes you may end up with a messy commit history that makes it hard to understand what you did and why.
author: 
# date: 2023-04-28 07:10:00 +0800
categories: [Git]
tags: [git, git-squash]
pin: true
keywords: git, git-squash
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false  
reason: Stuck on to revert some functioanlity from release branch. and release branch consists of all changes from all devs with hundreads of commit. So, it will be better if we use squash to revert only single commit and it's done. Ths leads me to create this one.
---


Understanding the **Squash** Flag, Benefits, and Real-World Use Cases


<span class="dropcap-element-slot">G</span>it is a tool that helps you keep track of changes to your code. It can be used to collaborate with other developers, and it can also be used to revert to previous versions of your code. However, if you don't use Git carefully, you can end up with a messy commit history. This can make it difficult to understand what you did and why.


So, **Squash** is one of the option to keep your commit history clean.


> Sometimes, you may need to make a lot of commits to your code. This could be because you forgot to remove comments or typo or because you have a tight deadline and need to save your work before you sign off for the day. Whatever the reason, it's perfectly fine to make a lot of commits and you don’t know how to fix it. No problem! Git `Squash` is here to help you!

And this page will explore exactly that: what is Git Squash, why you should use it, When to use Squash and some ways to perform it. Lets get started!

<br>

## What is Git Squash?

Git is a powerful and popular version control system that allows you to track changes in your code and collaborate with other developers. However, sometimes you may end up with a messy commit history that makes it hard to understand what you did and why. For example, you may have multiple commits that fix typos, add comments, or refactor code. These commits are not very important and may clutter your history.

This is where git squash comes in handy. Git squash is a feature in Git that allows you to merge multiple commits into one single commit. This is useful when you want to clean up and simplify your commit history, group specific changes before forwarding them to others, or rewrite history to make it more meaningful.

<br>

## why you should use it?


To clean up your commit history. If you have a lot of small, unrelated commits, it can be difficult to see the big picture. Git Squash can help you combine these commits into one, making your commit history cleaner and easier to understand.

To make your commits more meaningful. When you squash commits, you can give them a more meaningful commit message that describes the overall change that you made. This can make it easier for you and others to understand what your code changes do.

To make it easier to collaborate with others. If you are working on a team project, it can be helpful to have a clean and organized commit history. Git Squash can help you achieve this, making it easier for your team members to understand your changes.


**Real-World Use Cases:**

 * **Use Case 1:** Feature Implementation
Imagine you're working on a new feature that requires multiple commits for bug fixes, improvements, and new functionality. Instead of cluttering the history with incremental commits, you can squash them into a single commit that encapsulates the entire feature's development.

 * **Use Case 2:** Cleaning Up Experimental Work
During development, you might create several experimental commits while exploring different solutions. Before merging into the main branch, squash these experimental commits to present a clean and coherent history to your team.

 * **Use Case 3:** Addressing Feedback - code review
After a code review, you receive feedback that necessitates changes to multiple commits. By squashing these commits and addressing the feedback, you create a concise history that reflects the final, approved changes.

<br>

## When to use Squash?


* When you have a lot of small, unrelated commits. This can make your commit history difficult to understand and track. Squashing these commits can help to clean up your history and make it easier to see the big picture.

* When you want to give a commit a more meaningful message. When you squash commits, you can give them a single commit message that describes the overall change that you made. This can make it easier for you and others to understand what your code changes do.

* When you are working on a team project and want to make it easier for your team members to understand your changes. A clean and organized commit history can make it easier for your team members to follow your work and identify any potential issues.

* When you are preparing to release your code. A clean commit history can make it easier for users to understand your code and identify any potential issues.

<br>

## How to Squash Your Commits?


There are two way to squash commits in Git (**interactive rebase** and **merge**), but the most common one is to use the interactive rebase command. Interactive rebase lets you modify your commit history by changing, deleting, reordering, or combining commits. but will discuss both ways here.

### Merge

```
git merge --squash feature/comments
```

This option is very simple to perform. It’s clean and fast, but it gives you almost no control on what you want to do. Also, you will perform a merge—and that might not be what you want.

![Alt](/assets/images/posts/merge-vs-merge-with-squash.png)  
<div class="image-caption-container image-caption-container-ux-impr content-small-text">
<!----><span class="image-caption"><!---->Git Tower</span>
<!---- ><span class="image-attribution image-attribution-ux-impr">© Provided by Her Zindagi</span><! -->
</div>


### Interactive Rebase 

The rebase option is usually considered to be the dangerous one, as you can lose commits or change everything in a way you didn’t intend. Despite this, it’s the one I prefer, and it gives you total control over the actions you need to perform.

```git
git rebase -i
```

To use interactive rebase, you need to specify the base commit and the branch that you want to rebase. The base commit is the one that comes before the commits that you want to squash. For example, if you want to squash the last three commits on your current branch, you can use the following command:

```git
git rebase -i HEAD~3
```

This will open a text editor with a list of the commits that you want to rebase. Each commit will have a command in front of it, such as pick, reword, edit, or squash. The pick command means to keep the commit as it is, while the squash command means to combine the commit with the previous one.

To squash commits, you need to change the command from pick to squash for the commits that you want to merge. For example, if you have three commits with the messages “Add feature A”, “Fix bug in feature A”, and “Improve feature A”, you can squash them into one by changing the commands like this:

```git
pick 1234567 Add feature A
squash 2345678 Fix bug in feature A
squash 3456789 Improve feature A
```

This will combine the three commits into one with the message “Add feature A”. You can also edit the commit message by changing the command from squash to fixup, which will discard the commit message of the squashed commit.

After you save and close the text editor, Git will perform the rebase and squash the commits. You can verify the result by using git log or git show.

<br/>

## Reference:

* [Git Tower][ref1]



[ref1]: https://www.git-tower.com/learn/git/faq/git-squash/