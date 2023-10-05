---
layout: wiki
title: Cheat Sheets
cate1: Devops
cate2: Docker
description: devops, docker
keywords: Basis, Docker
date_created: 2023-10-05
---

## Docker Commands Cheat Sheet

Certainly! Here's a Docker cheat sheet that includes some commonly used Docker commands and concepts:

### Docker Basics

- **Run a container:** `docker run <image>`
- **Run a container in the background:** `docker run -d <image>`
- **List running containers:** `docker ps`
- **List all containers (including stopped):** `docker ps -a`
- **Stop a running container:** `docker stop <container_id>`
- **Remove a container:** `docker rm <container_id>`
- **Pull an image from Docker Hub:** `docker pull <image>`
- **Search for images on Docker Hub:** `docker search <image_name>`
- **Inspect a container:** `docker inspect <container_id>`
- **View logs from a container:** `docker logs <container_id>`

### Docker Images

- **List downloaded images:** `docker images`
- **Remove an image:** `docker rmi <image_id>`
- **Build an image from a Dockerfile:** `docker build -t <image_name>:<tag> <path_to_Dockerfile>`
- **Tag an image:** `docker tag <source_image>:<source_tag> <target_image>:<target_tag>`
- **Push an image to Docker Hub:** `docker push <image_name>:<tag>`

### Volumes and Data

- **Create a volume:** `docker volume create <volume_name>`
- **List volumes:** `docker volume ls`
- **Mount a volume when running a container:** `docker run -v <volume_name>:<container_mount_path> ...`
- **Mount a host directory into a container:** `docker run -v <host_path>:<container_mount_path> ...`

### Networking

- **List Docker networks:** `docker network ls`
- **Create a custom bridge network:** `docker network create <network_name>`
- **Run a container on a specific network:** `docker run --network=<network_name> ...`
- **Expose a port from a container:** `docker run -p <host_port>:<container_port> ...`
- **Link containers together:** `docker run --link <container_name>:<alias> ...`

### Docker Compose

- **Start containers defined in a Compose file:** `docker-compose up`
- **Start containers in the background:** `docker-compose up -d`
- **Stop and remove containers defined in a Compose file:** `docker-compose down`
- **Build or rebuild services:** `docker-compose build`
- **List containers started with Compose:** `docker-compose ps`
- **Run a one-off command in a service:** `docker-compose run <service_name> <command>`


This cheat sheet covers some fundamental Docker commands and concepts.

[PDF Cheat Sheet][1]{:target="_blank"}

## reference

* [Docker Documentation](https://docs.docker.com/){:target="_blank"}
* [how-to-remove-docker-images-containers-and-volumes](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes){:target="_blank"}

[1]: https://docs.docker.com/get-started/docker_cheatsheet.pdf