## Sprint 4 Planning Meeting (March 18, 2023)
## Attendance
- Mohammad Qadir
- Kyuhyun Ryu
- Abhinav Meda
- Ananth Chebolu
- Fernando Mancini

## Sprint 4 Goals
- Allow users to choose between light and dark mode
- Give users the option to use markdown and latex when creating discussion posts to better convey their questions
- Give users the ability to upvote or downvote posts/comments that they find helpful/unhelpful.
- Allow users to search through all posts using a keyword to quickly access relevant posts
- Create a new profile page that shows the information of the current user and all the posts they have created.
- Create a landing page for the website so that users can be greeted and know what the app allows them to do when they visit the website.
- Allow users to view piazza posts so that we previously saved in our database.

## Task Breakdown
- [008] Dark mode
    - Create a global context along with a button such that when clicked, it stores the user’s color preference in local storage.
    - Modify the UI that doesn’t fit with our darkmode color scheme.

- [013] Latex & Markdown support
    - Modify the rich text editor from the last sprint to support Latex so users can use it to write posts.
    - Modify the rich text editor from the last sprint to support Markdown so users can use it to write posts.

- [014] Upvote & Downvote support
    - Create a Mongoose model to represent votes made on ExamJam.
    - Add a POST endpoints to the Posts and Comments controller that adds, updates, or deletes votes.
        - POST: posts/:postId/vote?type=<up|down>
        - POST: /comments/:commentId/vote?type=<up|down>
    - Create a VoteButton component that appears on all Post and Comment components such that when clicked, will mark a user’s vote on the particular post or comment.

- [019] Searching For Posts
    - Modify the Posts controller that retrieves posts by courseId to support an optional query parameter called “keyword”.
    - Modify the Posts controller that retrieves exams by examId to support an optional query parameter called “keyword”.

- [026] Profile Page
    - Implement a backend endpoint that retrieves a paginated list of all of the posts created by the current logged in user.
    - Implement a backend endpoint that retrieves a paginated list of all of the comments created by the current logged in user.
    - Create a profileCard component that displays a logged in user’s avatar, description, username, and email.
    - Create a myPosts component that displays a paginated list of all posts created by the current logged in user.
    - Create the profile page that displays information using the above tasks

- [030] Display Piazza Posts
    - Update each Piazza post so they each display their relevant profile/content image.
    - Create an answerComponent that displays a student or instructor answer
    - Create a followupComponent that displays a follow up discussion
    - Create a piazzaPostComponent that displays a Piazza post’s title and content
    - Create a piazzaPostPage that uses previous tasks in this feature to construct the actual piazza post.

- [031] Landing Page
    - Create a landing page that displays information about ExamJam
    - Modify landing page to display login/register buttons when a user is not logged in.


## Meeting Dates
- March 18, 2023
    - Sprint planning meeting and sprint retrospective
- March 20, 2023
    - Standup
    - Completed the latex task of the latex support feature.
- March 22, 2023
    - Standup
    - Completed the dark mode feature [008]
- March 24, 2023
    - Standup
    - Completed tasks for the profile page story [026]
    - Modified backend Post model and service methods to enable preview of markdown and rich text depending on post submission format. [013]
- March 27, 2023
    - Standup
    - Completed the profile page story. [026]
    - Completed both the backend tasks, [modifyGetPostsByCourse] and [modifyGetPostsByExam] for the post search feature. [019]
    - Completed the voting story. [014]

- March 29, 2023
    - Finished the latex support feature [013]
    - Finished the landing page feature [031]

- March 31, 2023
    - Bug fixing user stories and managing PRs for the release
    - Completing sprint 4 deliverables


## Completed User Stories:
- [008] As a user, I should be able to toggle between light mode and dark mode so that I can customise my UI based on my preferences.
- [013] As a user I should be able to include code & latex snippets so that support my questions and or answers.
- [014] As a user I should be able to upvote posts/answers I find useful and downvote posts/answers that are misleading.
- [019] As a user, I should be able to search for discussion posts using keywords so that I can efficiently find and access posts that are most relevant to me.
- [026] As a user I want to have my own profile page so that I can see all my bookmarked items and posts/comments that I have created.
- [030] As a user, I want to be able to view piazza posts from previous offerings so that I can use discussions about past midterm/exam questions to study.
- [031] As an unregistered user, I want to see a landing page so that I know what the application is about.

## Spikes
- We didn’t have any spikes for this sprint. We did our tasks efficiently following our allocated due dates for each

## Team Capacity
- The points of all the user stories we planned on completing add up to 38
- We managed to complete all of the user stories!




