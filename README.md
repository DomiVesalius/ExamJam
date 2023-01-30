# ExamJam

## Motivation

Students at the University of Toronto spend a lot of their waking time studying for upcoming midterms and finals. This 
often involves the use of past exams as a form of practice in order to truly hone their skills. The only issue is that
they are often held back by the lack of past exam answers which may lead them to build bad problem-solving habits due
to ignorant practice. ExamJam aims to bridge the gap in knowledge by providing an accessible platform for
current students to discuss past exam answers with their classmates and for future students to learn from those very
same discussions many semesters in the future.

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
6. After you have confirmed that everything is working fine, you can shutdown the containers using `docker compose down`

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

Our development team uses git flow for contributions. The branches are as follows:
* `master`: Contains production ready releases
* `develop`: Branches off of master and contains the latest development changes

To implement a new feature:
1. Create a branch off of `develop` that matches `feature/DEV-###-*` where `###` is the number corresponding to the feature on Trello.
2. Implement the feature...
3. Create a pull request to merge into `develop` following the PR template given in `.github/` directory. 
4. Request a review and approval by at least 2 other developers prior to merging changes into `develop`

For other scenarios such as hot/bugfixes, follow the guidelines [here](https://nvie.com/posts/a-successful-git-branching-model/).