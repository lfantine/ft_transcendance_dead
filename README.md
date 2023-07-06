# Docker-Compose multi-stage build base

## Overview
- [Description](#description)
- [Requirements](#requirements)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Note](#note)
- [License](#license)

## Description
A docker-compose base project with multi-stage build for a NextJS full-stack application.</br>
This project is using custom Dockerfiles that are extending official docker images.</br>
Cluster and Containers names are based on the value of <strong>COMPOSE_PROJECT_NAME</strong> in the <strong>.env</strong> file.</br>
You can have a look at the <strong>.env.example</strong> file to check default values used and put you're own in a <strong>.env</strong> file.</br>
By default this project will deploy on <strong>localhost</strong> with the development build on port <strong>443</strong>, I'm using a <strong>self-signed SSL certificate</strong> that I create in the Nginx Dockerfile.</br>
If you want to customize this stack for you're own needs, feel free to do it, you can refer to the [Project Structure Section](#project-structure) for more information.

How to test this project ? Check the [Usage section](#usage)

### Want some more info about ?
- Dockerfiles ==> [click here](https://docs.docker.com/engine/reference/builder/)
- Docker-Compose ==> [click here](https://docs.docker.com/compose/)
- Nginx official image ==> [click here](https://hub.docker.com/_/nginx)
- Php official image ==> [click here](https://hub.docker.com/_/php)
- Node official image ==> [click here](https://hub.docker.com/_/node)
- Postgresql official image ==> [click here](https://hub.docker.com/_/postgres)

## Requirements
- docker version >= 17.12.0 (needed for compose version)
- docker-compose version >= 3.5 (needed for some specific instructions)

## Usage
### First time using this repo ?
- ```git clone https://github.com/ConiDev/docker-compose-multi-stage-build-base.git``` (download project)
- ```cd docker-compose-multi-stage-build-base``` (move to project folder)
- ```cp .env.example .env``` (create .env file at root of folder)

### Start project in DEV mode:
- ```make```
- ```make dev```

### Start project in PROD mode:
- ```make prod```

### Stop project:
- ```make stop```

### Endpoints in DEV mode:
- ```https://localhost```   (You should see the Nginx welcome index)
- ```https://localhost/adminer``` (You should see the adminer login page)
- ```https://localhost/node``` (You should see the Nextjs welcome index)

### Endpoints in PROD mode:
- ```https://localhost```   (redirect to /node)
- ```https://localhost/node``` (You should see the Nextjs welcome index)

## Project Structure
```
├── DockerFiles (Folder with all different Dockerfile used)
|         |
|         ├── Nginx
|         |       |
|         |       ├── conf (custom files to configure Nginx) currently using a template to allow ENV substitution
|         |       |
|         |       ├── conf-prod (same as conf but for production)
|         |       |
|         |       └── Dockerfile (Dockerfile used for Nginx container)
|         |
|         ├── Node
|         |      |
|         |      └── Dockerfile (Dockerfile used for Node container)
|         |
|         ├── Php
|         |     |
|         |     ├── conf (custom files to configure Php)
|         |     |
|         |     ├── conf-prod (same as conf but for production)
|         |     |
|         |     └── Dockerfile (Dockerfile used for Php container)
|         |
|         └── Postgresql
|                      |
|                      └── Dockerfile (Dockerfile used for Postgresql container)
|
├── node-src (this folder is used as a volume bind mount in development build)
|         |
|         └── Nextjs base src folder (only added a basepath configuration to access over '/node' url path)
|
├── php-src (will only be used in development build)
|         |
|         └── adminer (lightweight files to allow debugging on database)
|
├── .dockerignore (only with production build anything that should not be copied in the node docker image)
|
├── .env.example (default ENV values example)
|
├── .gitignore (anything that should not appear on the repo, for example: '.env' files with secrets password / tokens etc...)
|
├── docker-compose.override.yml (Dev Config file)
|
├── docker-compose.prod.yml (Prod Config file)
|
├── docker-compose.yml (Base Config file)
|
└── Makefile (used to facilitate docker compose commands)
```

## Note
This Repo is an example project and should not be used directly for production deployment.

## License
This Project is under the [MIT License](/LICENSE)
