# Sprint 1 Planning Meeting (January 28, 2023)

## Attendance
* Mohammad Qadir 
* Kyuhyun Ryu 
* Abhinav Meda 
* Ananth Chebolu 
* Fernando Mancini

## Sprint 1 Goals

* Become acquainted with relevant technologies like React, TypeScript, NodeJS, MongoDB, and Docker. 
* Get all courses from UTSG, UTM, UTSC’s course websites 
* Get all exams for each available course on the UofT exam repository 
* Implement authentication system 
* Implement profile management page 
* Figure out how to embed PDFs in the browser

## Task Breakdown
### [001] userAuth
* Create user model with mongoose 
* Implement the following backend endpoints:
  * `POST /register`
  * `GET /verify-email` 
  * `POST /login` 
  * `DELETE /logout`
* Implement the following frontend pages and components:
  * Registration page 
  * Login page 
  * Create authentication context using context api 
  * Logout button

### [004] userProfile
  * Implement the following backend endpoints:
    * Update the username
    * Change the password 
    * Update the bio 
    * Delete a user 
  * Create the following frontend pages and components:
    * Update username form 
    * Change password form 
    * Change bio form 
    * Delete user button 
    * Profile page encompassing all of the above forms

### [005] dbLoadData
* Create scripts to scrape the following:
  * The list of UTSG courses and their information (title, code etc)
  * The list of UTSC courses and their information 
  * The list of UTM courses and their information 
  * PDF files from the UofT past exam repository

## Meeting Dates
* Feb 1, 2023 
  * Created User and Course models and began to populate the cloud database with courses. Organised and took note of file structure.
* Feb 2, 2023 
  * Started documenting frontend components into Storybook and configured state management tools like Redux. Uploaded all UTSG courses to the cloud database and made minor tweaks to models.
* Feb 4, 2023 
  * Created frontend components and setup routing between pages. Mocked up search-bar using Material UI. Began working on the UTM script since each campus structures their HTML differently.
* Feb 6, 2023 
  * Finished backend routes and finished login and register pages. Additionally we made the search-bar more interactive. Uploaded all UofT courses from each campus to the cloud database and began uploading exams.
* Feb 8, 2023 
  * Due to MongoDB Atlas space issues, we downloaded all of our data to a local MongoDB instance. Created frontend components, finished authentication and also created a PR for it.

## Completed User Stories

* [001] As an unregistered user, I should be able to register and log in to my account to use the product.
* [004] As a user, I should be able to manage my profile. 
  * Users can delete and update their account as they wish. 
  * The UI still needs some work.
* [005] As a developer, I should be able to quickly download all UofT exams without having to manually visit every past exam
  * Downloaded all UTM, UTSG, UTSC courses and all Math, Stats, and CS exams available on the exam repository. We will 
  continue uploading the rest of the courses as the project progresses but are unable to do all of them right now due to the Library website blocking our IP addresses and space issues concerning our cloud DB. 

## Spikes
* Two team members dropped the course in the last week of the sprint:
  * 2023 February 8 
  * 2023 February 10
* Exam documents exceeded the 512mb cap imposed by MongoDB and as such, we abandoned the cloud platform in favour of a locally hosted MongoDB instance.
  * Rate-limiting by UofT library website causing us to slow down in gathering data
* One of the team members that dropped did not participate, were unresponsive, and did no work for the entire sprint.
  * Other members had tasks that were blocked because of this and were not able to complete their assigned tasks/user story for this sprint

## Team Capacity
* The points of all the user stories we planned on completing add up to 36
* We managed to complete only 21 of those points since the remaining points belonged to the user stories that were blocked by
our unresponsive team member that dropped the course.

