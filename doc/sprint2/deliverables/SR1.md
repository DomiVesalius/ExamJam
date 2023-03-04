## Participants in Meeting

-   Kyuhyun Ryu
-   Ananth Chebolu
-   Mohammad Qadir
-   Fernando Mancini
-   Abhinav Meda

## Unfinished Tasks

-   Course Search
    -   Create search bar + navbar components in frontend.
    -   Create backend endpoint to fetch course info from database.
        -   including course names, course codes, descriptions, etc.
    -   Implement search results page such that on POST request to database with keyword, all courses matching the keyword is returned as course cards.
        -   Pagination should also be included for users to skip to different pages of search results.
-   Navigation
    -   Route all important pages from specific components in frontend UI.
        -   Examples:
            -   Logout button => Main page (logged out)
            -   Search icon => Course search page
            -   Profile icon => User's profile
            -   Profile dropdown (dashboard) => User's dashboard

-   Scrape past piazza posts
    -   Develop a script to scrape past piazza posts from archived UofT courses.
        -   Purpose: To use these past posts as a starting dataset for other features/user stories.

    -   Scrape as many past piazza forums as possible and add to database.

-   Course Page
    -   When a course card is clicked through course search, all relevant information about the course should be displayed.
    -   This includes links to all exams for the course, as well as a feed of posts made related to exams in the course.
-   Exam Page
    -   View the selected exam from above course page as (embedded) PDF on browser.



## Practices to Continue During Next Sprint

1.   Holding standups every other day (or as many as possible) to notify others what everyone is currently working on.
1.   

## New Practices to Use During Next Sprint

1.   

## Harmful Practices to Stop Using Next Sprint

1.   Daily standups.
     -   Reduce to standups every other day.
2.   Although some may be busy on certain days/weeks due to other courses, they should try to spend some time with the project each day so that their workload doesn't pile up towards the deadline.
3.   

## Best/Worst Experience During Sprint 1

-   Kyuhyun Ryu
    -   Best: Working with MUI and React on frontend to create components and test through Storybook.
    -   Worst: Debugging CORS from backend and allowing Storybook's port to connect to backend endpoint.
-   Ananth Chebolu
    -   
-   Mohammad Qadir
    - Best: Completing a robust authentication system and having it work properly. I also enjoyed learning how to test REST APIs using Jest and supertest.
    - Worst: Having the team drop by 2 people in the last few days before the deadline and having to start and finish their work since they did not start their tasks.
-   Fernando Mancini
    -   
-   Abhinav Meda
    -  Best: Improving my skills with webscraping in Python and using the collected data for something useful.
    -  Worst: Getting blocked by UToronto websites for sending too many requests to the library website. 	
