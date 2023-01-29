# ExamJam

## Motivation

## Installation and Setup

Install the following:
1. [Docker Desktop](https://docs.docker.com/compose/install/)
   * This should include Docker Compose, Docker Engine, and Docker CLI
2. [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Clone this repository
4. Install dependencies for both frontend and backend
    ```shell
    cd frontend/app/
    npm install
    #======================
    #======================
    cd backend/app/
    npm install
    ```
5. Run `docker compose up -d --build`
   * At this point, the frontend and backend should be running on `localhost:3000` and `localhost:8080` respectively.
   * Nginx is also set up as a reverse proxy, so you can also go straight to `localhost` to get the frontend and `localhost/api` for the backend.
   * Backend API docs should be available at `localhost/api/docs` or `localhost:8080/api/docs`

## Tech Stack

### Frontend
* TypeScript
* React
* HTML/CSS
* Material-UI

### Backend
* TypeScript
* Node.js
* Express.js
* MongoDB

## Contributing
