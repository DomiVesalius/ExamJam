# Product Backlog

**Notes**
* The priority scale is from 1-5
  * 1 = the least important
  * 5 = most important
* COS = Criteria of Satisfaction
## User Stories

1. As a user, I should be able to toggle between light mode and dark mode so that I can customize my UI.
   * Priority: 1
   * COS:
     * A toggle at the top that shows a sun for light mode and a moon for dark mode.
     * The preference is persistent throughout any browser i.e. refreshing the page does not reset to the default setting
2. As a user, I should get a notification if I get a reply to any of my comments or discussion posts so that I may be able to respond back quickly.
   * Priority: 2
   * COS:
     * A user should have a notification inbox containing a list of received notifications paginated by recency.
     * Notifications for owned posts or comments are automatically enabled during creation time.
     * A message is sent to the users notification inbox
     * An email is sent to the address tied to the user's account.
       * This option can be toggled
       * Enabled by default
3. As a user I should be able to manage notifications for any discussion post or comment so that I can filter which notifications I want to receive and which ones I don't want to receive.
   * Priority: 2
   * COS:
     * Users can toggle notifications for other comments and posts by clicking a notification button tied to the specific comment/post.
     * A message is sent to the users notification inbox
     * An email is sent to the address tied to the user's account.
       * This option can be toggled
       * Disabled by default
4. As a user I should be able to include code snippets to support my questions and or answers so that other people can differentiate what is considered code and what is considered part of the question/answer.
   * Priority: 4
   * COS:
     * 3 backticks to indicate a code snippet similar to markdown for code writing.
     * Any text within the pair of 3 backticks are rendered as a code snippet
5. As a user I should be able to upvote answers I agree with and downvote answers I disagree with so that I may be able to agree/disagree with others' answers.
    * Priority: 2
    * COS:
      * Follow the same system as reddit
      * A score is displayed next to the comment component
        * Score = # of upvotes - # of downvotes
6. As a user I should be able to flag users misbehaving on the site so that the environment (application) becomes a safe space for others to discuss.
    * Priority: 3
    * COS:
      * A simple flag icon near each comment/post made that can be pressed to inform moderators.
7. As a user, I should be able to create tags for a course I have subscribed to so that they may be attached to discussion posts.
    * Priority: 3
    * COS:
      * Tags that already exist cannot be duplicated
      * A list of existing tags are visible to the user
8. As a user, I should be able to filter discussion posts within a certain course by their tags so that I may be able to easily find specific discussions I am looking for.
     * Priority: 3
     * COS:
       * Users can click on any tag within the list of existing tags which will yield attached discussion posts 
9. As a user, I should be able to search for discussion posts using keywords so that I can narrow my search for a discussion post.
     * Priority: 3
     * COS:
       * Within every course section, there is a search field that will yield discussion posts containing the keywords used.
10. As a user, I should be able to see my view history of posts I have looked at so I can revisit them easily.
     * Priority: 2
     * COS:
       * There is a page that displays all my viewed posts. 
       * The page is accessible via my profile page. 
       * A user can only view their own history.
11. As a user, I should be able to typeset LaTeX to posts and discussions so that my posts are more human-readable to others.
      * Priority: 4
      * COS:
        * Similar to code snippets, write 3 backticks with latex next to first 3 backticks to specify that the current block within the backticks are to be rendered to typeset.
12. As a user, I should be able to apply to be a course moderator so that I can help maintain academic integrity.
      * Priority: 3
      * COS:
        * There is a form that sends an email to the system administrators address
        * The form contains a text-field where an aspiring moderator can list their reasoning for wanting to moderate
        * Information associated with the currently logged in user is sent by default
13. As a moderator I should have moderation permissions so that I can maintain a safe environment where other users can talk freely and openly about their ideas.
      * Priority: 3
      * COS:
        * Moderators can:
          * Temporarily or permanently ban users. 
          * Delete or make posts/comments hidden. 
          * Pin comments on discussion threads. 
          * Pin discussion threads in course pages. 
          * View the view history of other users.
14. As a moderator, I should have a moderation panel/page so that I can keep track of past and current moderation activity from other moderators.
      * Priority: 3
      * COS:
        * Only moderators have access to this page
        * The following sections exist:
          * Flags:
            * A list containing all flagged posts/comments that have not been reviewed
            * A list containing flagged posts/comments that have been reviewed
            * Moderators can toggle a flagged post/comment as reviewed or not reviewed
          * A list containing all users that have bookmarked/subscribed to a course
15. As a developer, I should be able to generate a dataset of answers to past exam questions using artificial intelligence (ChatGPT) so that other users don't feel as nervous when creating a new thread/discussion post.
      * Priority: 4
      * COS:
        * Done using the [OpenAI API](https://beta.openai.com/docs/introduction)
        * This runs as a cron-task (due to rate-limiting)
        * Runs against every exam question
          * Uses PDF parsing to create a list of questions on an exam
          * Each question is fed to the OpenAI API
        * Answers are displayed on the corresponding exams page with a disclaimer that it is AI generated
