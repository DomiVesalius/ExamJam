# Sprint 2 Planning Meeting (February 11, 2023)
## Attendance
- Mohammad Qadir 
- Kyuhyun Ryu 
- Abhinav Meda 
- Ananth Chebolu 
- Fernando Mancini

## Sprint 2 Goals
- Become acquainted with relevant technologies like React, TypeScript, NodeJS, MongoDB, and Docker. 
- Start scraping data from piazza forums 
- Add searching functionality to our app using the data scraped in sprint 1 
- Implement the displaying of course and exam data on various frontend pages 
- Improve UI/UX of our application by making navigation easier by making an intuitive navbar

## Task Breakdown
- [002]
  - Create the search bar using React and MUI 
  - Create the navbar and integrate the search bar component 
  - Setup the backend endpoint for fetching course(s)’ info from the database 
  - Create a course card component 
  - Integrate the course card component into course list by arranging the cards in grid layout. 
  - Create the search results page using course list and nav bar.
- [003]
  - Create a PDF viewer component that displays a pdf given a url 
  - Create a backend endpoint for retrieving a certain exam file 
    - GET /exams/files/:examId 
  - Create a page-level component that displays the exam in an embedded pdf and other related information like offering date 
  - Style the exam page so that it has good UI/UX
- [027]
  - Create database models to represent raw/cleaned piazza comment and post data 
  - Create a script that scrapes a piazza forum for all posts and comments and stores that raw response data in MongoDB 
  - Create a script that cleans the raw response data and stores them as PiazzaPost and PiazzaComment documents 
  - Implement read endpoints for clean piazza data 
  - Getting a paginated list of piazza posts for a given course code 
  - Getting a specific piazza post given its forum id and post number 
  - Display the piazza data as a list of previews for piazza posts on the course page
- [028]
  - Create an endpoint that queries the database for exam data corresponding to a given course 
  - GET /courses/:courseCode/exams 
  - Create and endpoint that queries the database for a specific course and response with the course’s related information 
  - GET /courses/:courseCode 
  - Create a frontend card component that displays information about a single exam
  - Create a frontend component that displays all exams for a specific course in a neat table-like structure
- [029]
- Create a navbar with both authenticated and unauthenticated states


## Meeting Dates
- Feb 11, 2023 
  - Sprint planning meeting and sprint retrospective 
- Feb 14, 2023 
  - Standup; not much progress due to other courses 
- Feb 16, 2023 
  - Standup; Implemented script that scraped piazza forums 
  - Also implemented a bugfix for the same script the day after. 
- Feb 20, 2023 
  - Standup. Completed making a reactive navbar for [029]
  - Completed backend endpoints for paginated searching of courses 
- Feb 22, 2023 
  - Standup; not much progress due to other courses 
  - Completed one of the backend READ endpoints for piazza 
- Feb 24, 2023 
  - Standup; not much progress due to other courses 
  - Completed in creating search results page for [002]
- Feb 27, 2023 
  - Standup + help session to debug and troubleshoot issues
- March 3, 2023
  - Completing a majority of our user stories and managing PRs for the release 
  - Completing sprint 2 deliverables

## Completed User Stories:
- [002] As a user, I should be able to search for any course at UofT so that I can filter through courses I’d like to see the exams for.
- [003] As a user, I should be able to see any past exam I want to use for preparation so that I am able to use the past exam as a reference to discussion posts.
- [027] As a user, I would like to be able to see piazza posts from past sessions so that I may use them to answer any questions that I have.
- [028] As a user, I want to be able to see a page for any course so that I can see a all related information such as posts, and exams from that course
- [029] As a user, I want to be able to navigate to all important pages in the application so that I can easily use all of its core features.

## Spikes
- Lack of progress in the initial week of sprint 2
- Procrastination of certain tasks leading to the blocking of others
- Caused most of our user stories to be completed on the day of the deadline
- During standup meetings, members were frequently missing
- There were a lot of issues relating to storybook and having it properly query the backend: cors and environment variable mismatches
- There was an issue with integrating file streaming with TSOA that a lot of hours were sunk into.

## Team Capacity
- The points of all the user stories we planned on completing add up to 35
- We managed to complete all of the user stories!
