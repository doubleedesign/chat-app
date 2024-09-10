# Chatty

Phase 1 of a chat application for 3813ICT Software Frameworks at Griffith University.

## Table of contents
- [Overview](#overview)
- [Server](#server)
  - [Installation and local development](#installation-and-local-development)
  - [Documentation](#documentation)
  - [Mock data](#mock-data)
- [Front-end](#front-end)
  - [Installation and local development](#installation-and-local-development-1)

---
## Overview

To come.


## Server
The server is a Node.js application that uses Express.js to serve a RESTful API. The server is responsible for managing users, groups, and channels. For the purposes of Phase 1, data is currently stored in JSON files. 

### Installation and local development

Install dependencies:

```bash
cd server
npm install
```

Run the server in development mode (uses Nodemon to watch for changes):
```bash
npm run dev
```

### Documentation
I have used [express-jsdoc-swagger](https://www.npmjs.com/package/express-jsdoc-swagger) to generate web-based documentation of the API. The documentation can be accessed at `http://localhost:4100/docs` when the server is running.

![Swagger documentation screenshot](./doc-assets/swagger-ui.png)

### Mock data
I have created a script to generate mock users, groups, and channels for development and testing purposes. Generated files are included in this repository, but the generation script can be re-run using:

```bash
cd server
npm run generate
```

---
## Front-end

The front-end is an Angular application with custom UI components.

### Installation and local development

Install dependencies:

```bash
cd frontend
npm install
```

Run the front-end in development mode:
```bash
npm run start
```

---
