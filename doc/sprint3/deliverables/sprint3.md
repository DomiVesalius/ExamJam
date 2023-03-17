## Sprint 3 Planning Meeting (March 4, 2023)
## Attendance
- Mohammad Qadir
- Kyuhyun Ryu
- Abhinav Meda
- Ananth Chebolu
- Fernando Mancini

## Sprint 3 Goals
- Implement a feature that will allow users to create discussion posts
- Add bookmarking of courses, posts, and exams to improve UX
- Complete the base functionality by allowing users to comment on discussion posts

## Task Breakdown
- [009]
    - Create the following endpoints:
        - `POST /post`
            - Creates a post related to an exam
        - `GET /posts/:postId`
            - Gets all the information related to a specific post
        - `DELETE /posts/:postId`
            - Deletes the post with the given id
        - `GET /posts?examId=<examId>&courseCode=<courseCode>`
            - Gets a list of posts related to either a course or an exam
    - Create a frontend form that can be used to create a post related to an exam
    - Create a frontend component that displays a paginated list of posts for a specific course
- [010]
    - Create the following endpoints:
      - `POST /comments`
        - Creates a comment for a logged in user
      - `GET /comments/posts/:postId`
        - Retrieve a paginated list of comments for a specific post
      - `PATCH /comments/:commentId`
        - Updates a given comment for a logged in user
      - `DELETE /comments/:commentId`
        - Deletes a given comment for a logged in user

    - Create the following components
      - `commentForm`
        - A form component to let a logged in user submit a comment
      - `commentCard`
        - A component that displays comments and any subsequent replies.
      - `paginatedCommentsList`
        - A component that is used to display a paginated list of comments
- [016]
    - Create the following endpoints
      - `POST /bookmarks`
        -  Create a bookmark for a logged in user
      - `GET /bookmark`s
        -  Get a paginated list of bookmarks for a logged in user
    - Create the following model
      - `bookmarkModel`
      - Represent a bookmark in the database
    - Create the following components
      - `BookmarkButton`
        - A button that when clicked, creates a bookmark for the given content for a logged in user
      - `BookmarkedItem` & `PaginatedExamTable`
        - Display a paginated list of bookmarked items and exams
      - `BookmarkTabList`
        - Display bookmarked items and exams in separate sections


## Meeting Dates
- March 4, 2023
    - Sprint planning meeting and sprint retrospective
- March 7, 2023
    - Standup
    - Completed making the Bookmarks model and created a pr for it. Today I started to create the backend endpoints to add a Bookmark for a user.
    - Completed task to display bookmarked courses on main dashboard page.
- March 9, 2023
    - Standup
    - Completed endpoint for creating posts.
    - Completed endpoint for deleting posts.
    - Created a few components of the post creation page.
    - Also implemented a bugfix for the same script the day after.
    - Nearly finished the create and remove bookmark endpoint.
- March 13, 2023
    - Completed the Post feature which allows users to create, and read discussion posts made by other users. [009]
- March 16, 2023
    - Completed the Comment feature which allows users to respond to discussion posts. [010]
    - Completed the Bookmarking feature which allows users to bookmark posts, and exams. [016]
- March 17, 2023
    - Bug fixing user stories and managing PRs for the release
    - Completing sprint 3 deliverables

## Completed User Stories:
- [009] As a user I should be able to create discussion posts related to a specific exam.
- [010] As a user, I should be able to comment so that I can ask follow up questions and contribute to discussion posts.
- [016] As a user, I want to book mark posts, exams, that I find useful so that I can revisit them at a later date.


## Spikes
- A delayed start to the Frontend Post tasks required extra resources in order to for the Posts task to not block the Comment feature

## Team Capacity
- The points of all the user stories we planned on completing add up to 25
- We managed to complete all of the user stories!
