# Product Backlog

**Notes**
* The priority scale is from 1-5
  * 1 = the least important
  * 5 = most important
* COS = Criteria of Satisfaction
## User Stories

1. As an unregistered user, I should be able to register and log in to my account to use the product.
   * Priority: 5
   * COS:
     * There is a sign-up page and a sign-in page. 
     * Users can only register with their UofT email address. 
     * After registering, the email can be verified by clicking on a url sent to that email address. 
     * After verification is complete, the user should be able to login with their email and password. 
     * Logging in should redirect the user to the main dashboard.
     * Users can log out after logging in (log-out button is visible after a user logs in).
2. As a user, I should be able to manage my profile
   * Priority: 2
   * COS: 
     * Users can:
       * Customize their profile picture
       * Update their display name
       * Change their passwords
       * Delete their account
       * Add a bio
3. As a user, I should be able to toggle between light mode and dark mode so that I can customize my UI.
   * Priority: 1
   * COS:
     * A toggle at the top that shows a sun for light mode and a moon for dark mode.
     * The preference is persistent throughout any browser i.e. refreshing the page does not reset to the default setting
4. As a user I should be able to create discussion posts related to a specific exam.
   * Priority: 5
   * COS:
     * There is a button next to a viewable exam that allows users to create a discussion post related to that exam
     * Other users are able to view the discussion post on a feed
5. As a user I should be able to comment under any discussion post for a course
    * Priority: 5 
    * COS:
      * Other users are able to reply to the comment
      * The comments are displayed in a tree-like structure (similar to reddit)
      * The comments are paginated
      * Comments can be sorted by time posted and popularity (by downvotes in ascending order)
6. As a user, I should get a notification if I get a reply to any of my comments or discussion posts.
   * Priority: 2
   * COS:
     * A user should have a notification inbox containing a list of received notifications paginated by recency.
     * Notifications for owned posts or comments are automatically enabled during creation time.
     * A message is sent to the users notification inbox
     * An email is sent to the address tied to the user's account.
       * This option can be toggled
       * Enabled by default
7. As a user I should be able to manage notifications for any discussion post or comment
   * Priority: 2
   * COS:
     * Users can toggle notifications for other comments and posts by clicking a notification button tied to the specific comment/post.
     * A message is sent to the users notification inbox
     * An email is sent to the address tied to the user's account.
       * This option can be toggled
       * Disabled by default
8. As a user I should be able to include code snippets to support my questions and or answers
   * Priority: 4
   * COS:
     * 3 backticks to indicate a code snippet similar to markdown for code writing.
     * Any text within the pair of 3 backticks are rendered as a code snippet
9. As a user I should be able to upvote answers I agree with and downvote answers I disagree with
    * Priority: 2
    * COS:
      * Follow the same system as reddit
      * A score is displayed next to the comment component
        * Score = # of upvotes - # of downvotes
10. As a user I should be able to flag users misbehaving on the site
    * Priority: 3
    * COS:
      * A simple flag icon near each comment/post made that can be pressed to inform moderators.
11. As a user, I should be able to search for any course at UofT
    * Priority: 5
    * COS:
      * There is a search bar where you can type in a course code which displays search results in real-time
      * Results are formatted as cards with all relevant info (course code and name)
12. As a user I should be able to see any past exam I want to use for preparation
    * Priority: 4
    * COS:
      * All the exams on the [UofT Exam Repository](https://login.library.utoronto.ca/index.php?url=https://exams.library.utoronto.ca) are visible under each course
      * Any exam on [Skule](https://skule.ca/past_exams) should be viewable.
13. As a user I should be able to bookmark/subscribe and see all the courses, exams, and comments that I have bookmarked.
    * Priority: 2
    * COS:
      * Bookmarked/subscribed items are visible on the main dashboard right after logging in
      * Users can filter by type (exams, courses, comments, posts)
14. As a user, I should be able to create tags for a course I have subscribed to so that they may be attached to discussion posts.
    * Priority: 3
    * COS:
      * Tags that already exist cannot be duplicated
      * A list of existing tags are visible to the user
15. As a user, I should be able to filter discussion posts within a certain course by their tags.
    * Priority: 3
    * COS:
      * Users can click on any tag within the list of existing tags which will yield attached discussion posts 
16. As a user, I should be able to search for discussion posts using keywords
    * Priority: 3
    * COS:
      * Within every course section, there is a search field that will yield discussion posts containing the keywords used.
17. As a user, I should be able to see my view history of posts I have looked at so I can revisit them easily
    * Priority: 2
    * COS:
      * There is a page that displays all my viewed posts. 
      * The page is accessible via my profile page. 
      * A user can only view their own history.
18. As a developer, I should be able to quickly download all UofT exams without having to manually visit every past exam
    * Priority: 5
    * COS:
      * A script runs through all available exams, downloads them, uploads to a database categorized according to course name.
19. As a user, I should be able to typeset LaTeX to posts and discussions so that my posts are more human-readable to others
    * Priority: 4
    * COS:
      * Similar to code snippets, write 3 backticks with latex next to first 3 backticks to specify that the current block within the backticks are to be rendered to typeset.
20. As a user, I should be able to apply to be a course moderator so that I can help maintain academic integrity
    * Priority: 3
    * COS:
      * There is a form that sends an email to the system administrators address
      * The form contains a text-field where an aspiring moderator can list their reasoning for wanting to moderate
      * Information associated with the currently logged in user is sent by default
21. As a moderator I should have moderation permissions
    * Priority: 3
    * COS:
      * Moderators can:
        * Temporarily or permanently ban users. 
        * Delete or make posts/comments hidden. 
        * Pin comments on discussion threads. 
        * Pin discussion threads in course pages. 
        * View the view history of other users.
22. As a moderator, I should have a moderation panel/page
    * Priority: 3
    * COS:
      * Only moderators have access to this page
      * The following sections exist:
        * Flags:
          * A list containing all flagged posts/comments that have not been reviewed
          * A list containing flagged posts/comments that have been reviewed
          * Moderators can toggle a flagged post/comment as reviewed or not reviewed
        * A list containing all users that have bookmarked/subscribed to a course
23. As a developer, I should be able to generate a dataset of answers to past exam questions using artificial intelligence (ChatGPT)
    * Priority: 4
    * COS:
      * Done using the [OpenAI API](https://beta.openai.com/docs/introduction)
      * This runs as a cron-task (due to rate-limiting)
      * Runs against every exam question
        * Uses PDF parsing to create a list of questions on an exam
        * Each question is fed to the OpenAI API
      * Answers are displayed on the corresponding exams page with a disclaimer that it is AI generated
